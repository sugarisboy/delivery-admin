import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

function getAuthHeaders() {
    const token = localStorage.getItem('token')
    const key = localStorage.getItem('key')

    if (token && key) {
        return {
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

export async function loadCategories() {
    return await get('/product/categories'
    ).then(response => {
        return response.data
    }).catch(error => {
        console.log('Categories load error:\n' + error)
        //this.props.addSnackbarEntry('warning', 'Failed load categories')
    })
}

export {API_URL}