import axios from 'axios'

const API_URL = 'http://localhost:8080'

function getAuthHeader() {
    const token = localStorage.getItem('token')
    return token && ('Bearer ' + token)
}

export function post(endpoint, data, headers = {}) {
    const config = {
        headers: {
            ...headers,
            Authorization: getAuthHeader()
        }
    }
    return axios.post(API_URL + endpoint, data, config)
}

export function get(endpoint, headers = {}) {
    const config = {
        headers: {
            ...headers,
            Authorization: getAuthHeader()
        }
    }
    return axios.get(API_URL + endpoint, config)
}

export {API_URL};
