import {SET_SHOP_ADDRESS, SET_SHOP_CITY, UPDATE_TABLE_SHOP} from "../actions/action-types";

const defaultState = {
    updatedShops: {
        shops: [],
        isAllShops: false
    },
    shopAddress: null,
    shopCityId: '',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_TABLE_SHOP:
            return {
                ...state,
                updatedShops: action.payload
            }
        case SET_SHOP_ADDRESS:
            return {
                ...state,
                shopAddress: action.payload
            }
        case SET_SHOP_CITY:
            return {
                ...state,
                shopCityId: action.payload
            }
        default:
            return {...state}
    }
}