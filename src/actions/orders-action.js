import {UPDATE_TABLE_ORDERS} from './action-types'
import {post} from "../service/api";

export function updateTableOrders(page = 0) {
    return async dispatch => {
        try {
            const resp = await post('/order/page?page=' + page)
            const {orders, lastPage, currentPage} = resp.data

            if (orders) {
                dispatch({
                    type: UPDATE_TABLE_ORDERS,
                    payload: {
                        orders: orders,
                        isAllOrders: lastPage - 1 === currentPage
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}