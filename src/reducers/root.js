import { combineReducers } from 'redux'
import login from './login'
import orders from "./orders";
import shops from "./shops";
import snackbars from "./snackbars";

const rootReducer = combineReducers({
    login, orders, shops, snackbars
})

export default rootReducer