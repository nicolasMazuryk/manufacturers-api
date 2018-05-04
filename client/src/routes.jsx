import React from 'react';
import api from './api';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ConnectPage from './pages/ConnectPage';
import MainLayout from './pages/MainLayout';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CONNECT: '/connect',
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLoggedIn = api.client.getToken();
      return isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: ROUTES.LOGIN }} />
      );
    }}
  />
);

const ConnectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLoggedIn = api.client.getToken();
      const isConnectedToDb = api.client.isConnected();

      if (!isLoggedIn) return <Redirect to={{ pathname: ROUTES.LOGIN }} />;
      if (!isConnectedToDb)
        return <Redirect to={{ pathname: ROUTES.CONNECT }} />;
      return <Component {...props} />;
    }}
  />
);

const Routes = () => (
  <MainLayout>
    <Switch>
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <PrivateRoute path={ROUTES.CONNECT} component={ConnectPage} />
      <ConnectedRoute path={ROUTES.HOME} component={HomePage} exact />
    </Switch>
  </MainLayout>
);

export default Routes;
