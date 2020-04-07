const initState = {
    users: []
}

function userReducer(state=initState, action) {
    switch(action.type) {
        case 'GET_USERS':
            console.log(action.userArray)
            return {
                ...state,
                users: action.userArray
            }
        case 'GET_USERS':
            console.log(action.err)
            return state
        case 'CURRENT_USER':
            return {
                ...state,
                currentUser: action.currentUser
            }
        case 'GET_INVITES':
            return {
                ...state,
                invites: action.invites
            }
        case 'GET_INVITES_ERROR':
            console.log(action.err)
            return state
        case 'SEND_INVITE':
            return {
                ...state,
                inviteSuccess: action.successMessage
            }
        case 'INVITE_WRONG':
            return {
                ...state,
                inviteWrong: action.errorMessage
            }
        case 'GET_CONTACTS':
            return {
                ...state, 
                contacts: action.contactsArray
            }
        case 'GET_CONTACTS_ERROR':
            console.log(action.err)
            return state
        default:
            return state
    }
}

export default userReducer