import { types } from '../types/types';

// al ser acciones síncronas no necesitan return

export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({
    type: types.uiRemoveError
})

// Loading Login actions
export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})