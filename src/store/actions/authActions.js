import Firebase from '../../config/firebase'

export const signUp = (newUser) => {
    return (dispatch) => {
        const firestore = Firebase.firestore();
        Firebase.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password
        ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            const userId = Firebase.auth().currentUser.uid
            dispatch({type: 'SIGNUP_SUCCESS', userId})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}

export const signIn = (credentials) => {
    return (dispatch) => {
        Firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            const userId = Firebase.auth().currentUser.uid
            dispatch({type: 'LOGIN_SUCCESS', userId})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    return (dispatch) => {
        Firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNOUT_ERROR', err})
        })
    }
}

export const clearError = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_ERROR"})
    }
}