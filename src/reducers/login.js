import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/action-types'
import { USER } from '../service/roles'

const defaultState = {
    isLoggedIn: false,
    loginError: null,
    role: USER,
    username: ''
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
                role: payload.role,
                username: payload.username
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