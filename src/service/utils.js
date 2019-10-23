import {get} from "./api";

export function isEmpty(str) {
    return !str || str.trim().length === 0
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