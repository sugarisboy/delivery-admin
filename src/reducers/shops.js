import {UPDATE_TABLE_SHOP} from "../actions/action-types";

const defaultState = {
    updatedShops: {
        shops: [],
        isAllShops: false
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_TABLE_SHOP:
            return {
                ...state,
                updatedShops: action.payload
            }
        default:
            return {...state}
    }
}