import {UPDATE_TABLE_ORDERS} from '../actions/action-types'

const defaultState = {
    updatedOrders: {
        orders: [],
        isAllOrders: false
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_TABLE_ORDERS:
            return {
                ...state,
                updatedOrders: action.payload
            }
        default:
            return {...state}
    }
}