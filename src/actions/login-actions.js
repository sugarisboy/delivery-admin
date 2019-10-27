import { post } from '../service/api'
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './action-types'
import moment from 'moment'
import { addSnackbarEntry } from './snackbars-action'
import { ADMIN, PARTNER, USER } from '../service/roles'

export function successLogin(role, username) {
    return dispatch => {
        if (role === USER) {
            dispatch(failLogin('Access denied!'))
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    role, username
                }
            })
        }
    }
}

export function failLogin(error) {
    return dispatch => {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
        if (error) {
            dispatch(addSnackbarEntry('error', error))
        }
    }
}

export function login(username, password) {
    return async dispatch => {
        try {
            const response = await post('/auth/login',
                {username, password})

            const {access, key} = response.data
            if (access && key) {
                const tokenData = parseJwt(access)
                console.log(tokenData)

                localStorage.setItem('token', access)
                localStorage.setItem('key', key)
                const role = extractRole(tokenData)
                const username = tokenData.sub
                dispatch(successLogin(role, username))
            } else {
                dispatch(failLogin('Unknown Error'))
            }
        } catch (e) {
            dispatch(failLogin(e.response.data.message))
        }
    }
}

function extractRole(tokenData) {
    const roles = tokenData.roles
    let role = USER

    if (roles.indexOf(PARTNER) !== -1) {
        role = PARTNER
    }
    if (roles.indexOf(ADMIN) !== -1) {
        role = ADMIN
    }

    return role
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

            const role = extractRole(tokenData)
            const username = tokenData.sub

            if (expDate.isAfter(now)) {
                dispatch(successLogin(role, username))
            } else {
                dispatch(failLogin())
                localStorage.removeItem('token')
            }
        }
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

export function logout() {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('key')

        dispatch({
            type: LOGOUT
        })
    }
}