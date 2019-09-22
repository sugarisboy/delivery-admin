import { LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/action-types'

const defaultState = {
    isLoggedIn: false,
    loginError: null,
    activeState: true
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_FAIL:
            return {
                ...state,
                loginError: action.payload,
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            }
        default:
            return {...state}
    }
}