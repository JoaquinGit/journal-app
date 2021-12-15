import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { firebase } from '../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import {startLoadingNotes } from '../actions/notes';

// Contiene las rutas principales
export const AppRouter = () => {

    const dispatch = useDispatch();

    // useState para tiempo de espera del checking
    const [checking, setChecking] = useState(true);

    // para saber si está logueado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {

            if( user?.uid ) {   // si el objeto user tiene algo, entonces pregunta si existe el uid
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);

                dispatch(startLoadingNotes( user.uid ));

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false); // cuando tengo la respuesta de que ya está autenticado el user

        });

    }, [dispatch, setChecking, setIsLoggedIn]) // Coloco dispatch como dependencia para evitar alerta por consola. Pero el dispatch no cambia realmente. useEffect debe ejecutarse sólo la primera vez y luego el observable (que devuelve .onAuthStateChanged) es el que se encarga de estar pendiente de los cambios en el logueo de user.

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
