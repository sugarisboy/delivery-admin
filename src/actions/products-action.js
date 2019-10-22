import {UPDATE_TABLE_PRODUCTS} from './action-types'
import {post} from "../service/api";

export function updateTableProducts(page = 0, shopId) {
    return async dispatch => {
        try {
            const resp = await post('/product/page?size=2&page=' + page, {shopId: shopId})
            const {products, lastPage, currentPage} = resp.data

            if (products) {
                dispatch({
                    type: UPDATE_TABLE_PRODUCTS,
                    payload: {
                        products: products,
                        isAllProducts: lastPage - 1 <= currentPage
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}