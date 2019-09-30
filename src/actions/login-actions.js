import { post } from '../service/api'
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './action-types'
import moment from 'moment'

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

            const {access, key} = response.data
            if (access && key) {
                localStorage.setItem('token', access)
                localStorage.setItem('key', key)
                successLogin()(dispatch)
            } else {
                failLogin('Unknown Error')(dispatch)
            }
        } catch (e) {
            failLogin(e.response)(dispatch)
        }
    }
}

export function checkAuth() {
    return async dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(failLogin())
        } else {
            const tokenData = parseJwt(token)
            const now = moment()
            const expDate = moment(tokenData.exp * 1000)

            if (expDate.isAfter(now)) {
                dispatch(successLogin())
            } else {
                dispatch(failLogin())
                localStorage.removeItem('token')
            }
        }

        function parseJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url
                .replace(/-/g, '+')
                .replace(/_/g, '/')

            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => {
                        return '%'
                            + ('00' + c.charCodeAt(0).toString(16))
                                .slice(-2);
                    }).join(''));

            return JSON.parse(jsonPayload);
        }
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('key')

        dispatch({
            type: LOGOUT
        })
    }
}