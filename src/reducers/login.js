import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/action-types'

const defaultState = {
    isLoggedIn: false,
    loginError: null,
    role: 'user'
}

export default (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOGIN_FAIL:
            return {
                ...state,
                loginError: payload,
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                role: payload
            }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false
            }
        }
        default:
            return {...state}
    }
}