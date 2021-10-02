import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest }  // le paso todo el resto de las propiedades
            component={ (props) => (    /* props = history, location y params */
                ( isAuthenticated )
                    ? <Redirect to="/" />
                    : <Component { ...props } />

            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
