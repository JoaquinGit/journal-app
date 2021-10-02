import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    
    switch (action.type) {

        // Register Errors
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        // Loading Login states
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }


        default:
            return state;  

    }
}   
