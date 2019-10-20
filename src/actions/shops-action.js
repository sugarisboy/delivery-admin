import {UPDATE_TABLE_SHOP} from './action-types'
import {post} from "../service/api";

export function updateTableShops(page = 0) {
    return async dispatch => {
        try {
            const resp = await post('/shop/page?size=25&page=' + page)
            const {shops, lastPage, currentPage} = resp.data

            if (shops) {
                dispatch({
                    type: UPDATE_TABLE_SHOP,
                    payload: {
                        shops: shops,
                        isAllShops: lastPage - 1 === currentPage
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}