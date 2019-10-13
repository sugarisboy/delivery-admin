import { combineReducers } from 'redux'
import login from './login'
import orders from './orders'

const rootReducer = combineReducers({
    login, orders
})

export default rootReducer