const initState = {
    users: []
}

function userReducer(state=initState, action) {
    switch(action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.userArray
            }
        case 'GET_USERS_ERR':
            console.log(action.err)
            return state
        case 'CURRENT_USER':
            return {
                ...state,
                currentUser: action.currentUser
            }
        case 'GET_INVITES':
            console.log('getting invites')
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
            console.log('getting contacts')
            return {
                ...state, 
                contacts: action.contactsArray
            }
        case 'GET_CONTACTS_ERROR':
            console.log(action.err)
            return state
        case 'CHAT_STARTED':
            return {
                ...state,
                chatId: action.docId
            }
        case 'CHAT_EXISTS':
            return {
                ...state,
                chatId: action.docId
            }
        case 'GET_CHATS':
            console.log('getting chats')
            return {
                ...state,
                chats: action.chatsArray
            }
        case 'OPEN_CHAT':
            return {
                ...state,
                openChat: action.openChat
            }
        case 'GET_MESSAGES':
            return {
                ...state,
                messages: action.messagesArray
            }
        default:
            return state
    }
}

export default userReducer