import {post} from "../service/api";
import {ORDERS_FAIL_NEXT, ORDERS_SUCCESS_NEXT} from "./action-types";


export function successNext(orders) {
    console.log(3, orders)
    return dispatch => {
        dispatch({
            type: ORDERS_SUCCESS_NEXT,
            payload: orders
        })
    }
}

export function failNext(error) {
    return dispatch => {
        dispatch({
            type: ORDERS_FAIL_NEXT,
            payload: error
        })
    }
}

export function next(currentPage) {
    return async dispatch => {
        try {
            const response = await post('/order/page?size=10&page=' + (currentPage + 1))

            const {orders} = response.data
            if (orders) {
                successNext(orders)(dispatch)
            } else {
                failNext('It is all items')(dispatch)
            }
        } catch (e) {
            failNext(e.response)(dispatch)
        }
    }
}