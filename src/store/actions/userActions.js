import Firebase from '../../config/firebase'
import * as firebase from 'firebase'

export const getUsers = () => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        let userArray = [];
        console.log(firestore)
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                userArray.push(doc.data())
            })
            dispatch({type: "GET_USERS", userArray})
        }).catch(err => {
            dispatch({type: "GET_USERS_ERR", err})
        })
    }
}

export const getCurrentUser = (user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('users').doc(user).get().then(doc => {
            const currentUser = doc.data()
            dispatch({type: "CURRENT_USER", currentUser})
        })
    }
}

export const sendInvite = (email, user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        const userFirstName = user.firstName
        const userLastName = user.lastName
        const inviteMessage = userFirstName + " " + userLastName + " wants to chat!"
        const successMessage = "This person has been sent an invite!"
        const errorMessage = "No matching users with this email!"
        firestore.collection('users').where('email', '==', email).get().then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching user with this email')
                dispatch({type: "INVITE_WRONG", errorMessage})
            }
            snapshot.forEach(doc => {
                const inviteObject = {}
                inviteObject.message = inviteMessage
                inviteObject.user = {}
                inviteObject.user.userId = user.userId
                inviteObject.user.firstName = user.firstName
                inviteObject.user.lastName = user.lastName
                inviteObject.user.initials = user.initials
                firestore.collection('users').doc(doc.id).set({
                    invites: firebase.firestore.FieldValue.arrayUnion(inviteObject)
                }, {merge: true})
                dispatch({type: "SEND_INVITE", successMessage})
            })
        }).catch(err => {
            console.log(err)
            dispatch({type: "INVITE_ERROR", err})
        })
    }
}

export const getInvites = (user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('users').doc(user).get().then(doc => {
            const invites = doc.data().invites
            dispatch({type: "GET_INVITES", invites})
        }).catch(err => {
            dispatch({type: "GET_INVITES_ERROR", err})
        })
    }
}

export const acceptInvite = (user, invite) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('users').doc(user.userId).set({
            contacts: firebase.firestore.FieldValue.arrayUnion(invite.user)
        }, {merge: true})
        .then(() => {
            console.log('first contact added')
            dispatch({type: "INVITE_ACCEPTED"})
        }).catch(err => {
            console.log(err)
        })
        const currentUser = {}
        currentUser.userId = user.userId
        currentUser.firstName = user.firstName
        currentUser.lastName = user.lastName
        currentUser.initials = user.initials
        firestore.collection('users').doc(invite.user.userId).set({
            contacts: firebase.firestore.FieldValue.arrayUnion(user)
        }, {merge: true})
        .then(() => {
            console.log('second contact added')
            dispatch({type: "INVITE_ACCEPTED"})
        }).catch(err => {
            console.log(err)
        })
    }
}

export const getContacts = (user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('users').doc(user).get().then(doc => {
            var contactsArray = [];
            const contacts = doc.data().contacts
            console.log(contacts)
            contacts.forEach(contact => {
                contactsArray.push(contact)
            })
            console.log(contactsArray)
            dispatch({type: "GET_CONTACTS", contactsArray})
        }).catch(err => {
            dispatch({type: "GET_CONTACTS_ERROR", err})
        })
    }
}

export const startChat = (currentUser, user) => {
    console.log(currentUser)
    console.log(user)
    return (dispatch) => {
        const docId = currentUser.userId + user.userId
        const firestore = Firebase.firestore();
        const docRef = firestore.collection('chats').doc(docId)
        const currentName = currentUser.firstName + ' ' + currentUser.lastName
        const currentInitials = currentUser.initials
        const otherName = user.firstName + ' ' + user.lastName
        const otherInitials = user.initials
        docRef.get().then(doc => {
            if (!doc.exists) {
                docRef.set({
                    chat: [],
                    participantId: [currentUser.userId, user.userId],
                    participantName: [currentName, otherName],
                    participantInitials: [currentInitials, otherInitials], 
                    chatId: docId,
                    dateCreated: new Date()
                }).then(() => {
                    dispatch({type: "CHAT_STARTED", docId})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('chat exists')
                dispatch({type: "CHAT_EXISTS", docId})
            }
        }).catch(err => {
            console.log('accessing chat doc errror', err)
        })
    }
}

export const getChats = (userId) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('chats').where('participantId', 'array-contains', userId).get().then(snapshot => {
            if (!snapshot.empty) {
                var chatsArray = [];
                snapshot.forEach(doc => {
                    const docVal = doc.data();
                    chatsArray.push(docVal)
                })
                dispatch({type: 'GET_CHATS', chatsArray})
            } else {
                console.log('empty')
            }
        })
    }
}

export const openChat = (participant1, participant2) => {
    return (dispatch) => {
        const docId = participant1 + participant2
        console.log(docId)
        const docIdTwo = participant2 + participant1
        console.log(docIdTwo)
        const firestore = Firebase.firestore()
        const docRef = firestore.collection('chats').doc(docId)
        const docRefTwo = firestore.collection('chats').doc(docIdTwo)
        docRef.get().then(doc => {
            if (!doc.exists) {
                console.log('no document')
                docRefTwo.get().then(doc => {
                    if (!doc.exists) {
                        console.log('no document')
                    } else {
                        console.log(doc.data())
                        const openChat = doc.data()
                        dispatch('OPEN_CHAT', openChat)
                    }
                })
            } else {
                console.log(doc.data())
                const openChat = doc.data()
                dispatch('OPEN_CHAT', openChat)
            }
        }).catch(err => {
            console.log('open chat error', err)
        });
    }
}

export const sendMessage = (input, docId) => {
    console.log(input)
    return (dispatch) => {
        const firestore = Firebase.firestore()
        firestore.collection('chats').doc(docId).set({
            chat: firebase.firestore.FieldValue.arrayUnion(input)
        }, {merge : true}).then(() => {
            dispatch({type: "MESSAGE_SENT"})
        }).catch(err => {
            console.log('message_send', err)
        })
    }
}

export const getMessages = (docId) => {
    return (dispatch) => {
        const firestore = Firebase.firestore()
        firestore.collection('chats').doc(docId).get().then(doc => {
            var messagesArray = [];
            const messages = doc.data().chat
            console.log(messages)
            messages.forEach(message => {
                console.log(message)
                messagesArray.push(message)
            })
            console.log(messagesArray)
            dispatch({type: "GET_MESSAGES", messagesArray})
        }).catch(err => {
            dispatch({type: "GET_MESSAGES_ERROR", err})
        })
    }
}
