import axios from 'axios'

const API_URL = 'http://localhost:8080'

function getAuthHeaders() {
    const token = localStorage.getItem('token')
    const key = localStorage.getItem('key')

    if (token && key) {
        return {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer_' + token,
            'Key': key
        }
    }
}

export function post(endpoint, data, headers = {}) {
    const config = {
        headers: {
            ...headers,
            ...getAuthHeaders()
        }
    }
    return axios.post(API_URL + endpoint, data, config)
}

export function del(endpoint, headers = {}) {
    const config = {
        headers: {
            ...headers,
            ...getAuthHeaders()
        }
    }
    return axios.delete(API_URL + endpoint, config)
}

export function upload(endpoint, data, headers = {}) {
    const config = {
        headers: {
            ...headers,
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(API_URL + endpoint, data, config)
}

export function patch(endpoint, data, headers = {}) {
    const config = {
        headers: {
            ...headers,
            ...getAuthHeaders()
        }
    }
    return axios.patch(API_URL + endpoint, data, config)
}

export function get(endpoint, headers = {}) {
    const config = {
        headers: {
            ...headers,
            ...getAuthHeaders()
        }
    }
    return axios.get(API_URL + endpoint, config)
}

export {API_URL}