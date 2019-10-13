import { ORDERS_FAIL_NEXT, ORDERS_SUCCESS_NEXT } from '../actions/action-types'

const defaultState = {
    currentPage: 1,
    orders: [],
    activeState: true
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORDERS_SUCCESS_NEXT:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return {...state}
    }
}