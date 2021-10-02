import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';

// React Dev Tools: https://github.com/zalmoxisus/redux-devtools-extension#usage. Config para poder aplicar varios middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// store solo recibe un reducer, por eso no es obligatorio usar combine reducers.
// Igualmente conviene usar siempre combineReducers (aunque tenga un sólo reducer) para no tener que refactorizar luego.


// paso los reducers por aquí para luego enviar al store
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer ///****** AAAAA */
});

// solo recibe un reducer
export const store = createStore(
    reducers,
    composeEnhancers(   // config del store
        applyMiddleware( thunk )    // acciones asíncronas
    ) 
);