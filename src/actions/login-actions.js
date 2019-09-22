import { post } from '../service/api'
import { LOGIN_FAIL, LOGIN_SUCCESS } from './action-types'
import { AuthData } from '../service/AuthData'

function successLogin(dispatch) {
    dispatch({
        type: LOGIN_SUCCESS
    })
}

function failLogin(dispatch, error) {
    dispatch({
        type: LOGIN_FAIL,
        payload: error
    })
}

export function login(username, password) {
    return async dispatch => {
        try {
            const response = await post('/auth/login',
                {username, password})

            const {access} = response.data
            if (access) {
                localStorage.setItem('token', access)
                successLogin(dispatch)
                console.log('success login', access)
            } else {
                failLogin(dispatch, 'Unknown Error')
            }
        } catch (e) {
            failLogin(dispatch, e.response)
        }
    }
}