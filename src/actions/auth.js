import Swal from 'sweetalert2';

import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import {startLoading, finishLoading} from "./ui";
import { noteLogout } from './notes';

// thunk permite retornar una función (callback)
// se pueden realizar varios dispatch dentro de la función
export const startLoginEmailPassword = (email, password) => {
    
    // thunk retorna el dispatch
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                
                // debo llamar un dispatch una vez que se ejecute todo y tenga la data 
                dispatch(
                    login( user.uid, user.displayName )
                )

                dispatch(finishLoading());
            })
            .catch( e => {

                dispatch(startLoading());
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
       
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return(dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password) // .createUserWith.. loguea automáticamente en firebase
        .then( async ({ user }) => {

            // guarda nombre en firebase
            await user.updateProfile({displayName: name });

            //console.log(user);

            // llamo dispatch mediante thunk luego de realizar tareas asíncronas
            dispatch(
                login( user.uid, user.displayName )
            )
        })
        .catch( e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        })
    }
}

export const startGoogleLogin = () => {
    return( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {

                dispatch(
                    login( user.uid, user.displayName )
                )
            })
    }
}

// retorna una accion
export const login = (uid, displayName) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

// Forma resumida
/* export const login = (uid, displayName) => ({
    
    type: types.login,
    payload: {
        uid,
        displayName
    }
    
}) */

// ******* Logout *******
export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout()); // Limpia lista de notas del usuario
    }
}

export const logout = () => ({
    type: types.logout
})

