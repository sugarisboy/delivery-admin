import { combineReducers } from 'redux'
import login from './login'
import orders from "./orders";
import shops from "./shops";

const rootReducer = combineReducers({
    login, orders, shops
})

export default rootReducer