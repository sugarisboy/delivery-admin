import {SNACKBAR_ADD_ENTRY, SNACKBAR_DISPOSE_ENTRY} from "../actions/action-types";

const defaultState = {
    tree: [],
    message: ''
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SNACKBAR_ADD_ENTRY:
            state.tree.push(action.payload)
            return {
                ...state,
                message: action.payload.message
            }
        case SNACKBAR_DISPOSE_ENTRY:
            return {
                tree: state.tree.filter(stack => {return stack.message !== action.payload.message}),
                message: action.payload.message + 1
            }
        default:
            return {...state}
    }
}