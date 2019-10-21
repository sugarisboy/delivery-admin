import {SNACKBAR_ADD_ENTRY, SNACKBAR_DISPOSE_ENTRY} from "./action-types";

export function addSnackbarEntry(variant, message, duration = 6000) {
    return async dispatch => {
        dispatch({
            type: SNACKBAR_ADD_ENTRY,
            payload: {
                variant: variant,
                message: message,
                duration: duration
            }
        })
    }
}

export function disposeSnackbarEntry(snack) {
    return async dispatch => {
        dispatch({
            type: SNACKBAR_DISPOSE_ENTRY,
            payload: snack
        })
    }
}