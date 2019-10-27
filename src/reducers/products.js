import {UPDATE_TABLE_PRODUCTS} from "../actions/action-types";

const defaultState = {
    updatedProducts: {
        products: [],
        isAllProducts: true
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_TABLE_PRODUCTS:
            return {
                ...state,
                updatedProducts: action.payload
            }
        default:
            return {...state}
    }
}