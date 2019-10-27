import { combineReducers } from 'redux'
import login from './login'
import orders from "./orders";
import shops from "./shops";
import snackbars from "./snackbars";
import products from "./products";

const rootReducer = combineReducers({
    login, orders, shops, snackbars, products
})

export default rootReducer