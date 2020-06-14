import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Clients from './pages/Clients';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
            )
        }
    />
);

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => {
    return (
        <BrowserRouter>
            <PublicRoute component={Login} path="/signin" exact />
            <PublicRoute component={Register} path="/register" exact />
            <PrivateRoute component={Dashboard} path="/" exact />
            <PrivateRoute component={Clients} path="/clients" exact />
        </BrowserRouter>
    );
};

export default Routes;
