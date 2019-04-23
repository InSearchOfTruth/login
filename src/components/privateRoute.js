import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, authorization: loggedIn, session: session, resetSession: resetSession,setAuthorization: setAuthorization,  ...rest }) => (
    
    <Route {...rest} path="/" render={props => (
        
        loggedIn
            ? <Component {...props} session={session} resetSession={resetSession} setAuthorization={setAuthorization}/>
            : <Redirect to={{ pathname: '/login' }} />
    )} />
    
)