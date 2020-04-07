const initState = {
    users: []
}

function authReducer(state=initState, action) {
    switch(action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                userId: action.userId
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                userId: action.userId
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                authError: ''
            }
        default:
            return state
    }
}

export default authReducer