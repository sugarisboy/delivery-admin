import { post } from '../service/api'
import { LOGIN_FAIL, LOGIN_SUCCESS } from './action-types'

export function successLogin() {
    return dispatch => {
        dispatch({
            type: LOGIN_SUCCESS
        })
    }
}

export function failLogin(error) {
    return dispatch => {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
}

export function login(username, password) {
    return async dispatch => {
        try {
            const response = await post('/auth/login',
                {username, password})

            const {access} = response.data
            if (access) {
                localStorage.setItem('token', access)
                successLogin()(dispatch)
                console.log('success login', access)
            } else {
                failLogin('Unknown Error')(dispatch)
            }
        } catch (e) {
            failLogin(e.response)(dispatch)
        }
    }
}