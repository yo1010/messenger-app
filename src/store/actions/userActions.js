import Firebase from '../../config/firebase'
import * as firebase from 'firebase'

export const getUsers = () => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        let userArray = [];
        console.log(firestore)
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data())
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
            console.log(currentUser)
            dispatch({type: "CURRENT_USER", currentUser})
        })
    }
}

export const sendInvite = (email, user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        var inviteMessage = ''
        firestore.collection('users').doc(user).get().then(doc => {
            const userFirstName = doc.data().firstName
            const userLastName = doc.data().lastName
            inviteMessage = userFirstName + " " + userLastName + " wants to chat!"
        })
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
                inviteObject.user = user
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
            console.log(invites)
            dispatch({type: "GET_INVITES", invites})
        }).catch(err => {
            dispatch({type: "GET_INVITES_ERROR", err})
        })
    }
}

export const acceptInvite = (user, invite) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('users').doc(user).set({
            contacts: firebase.firestore.FieldValue.arrayUnion(invite.user)
        }, {merge: true})
        .then(() => {
            console.log('first contact added')
        }).catch(err => {
            console.log(err)
        })
        firestore.collection('users').doc(invite.user).set({
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
                firestore.collection('users').doc(contact).get().then(doc => {
                    const contactObject = doc.data()
                    contactObject.userId = contact
                    console.log(contactObject)
                    contactsArray.push(contactObject)
                })
            })
            console.log(contactsArray)
            dispatch({type: "GET_CONTACTS", contactsArray})
        }).catch(err => {
            dispatch({type: "GET_CONTACTS_ERROR", err})
        })
    }
}

export const startChat = (currentUser, user) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        firestore.collection('chats').add({
            chat: [],
            participants: [currentUser, user]
        }).then(() => {
            dispatch({type: "CHAT_STARTED"})
        }).catch(err => {
            console.log(err)
        })
    }
}