import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import 'antd/dist/antd.css';

import api from './api';
import configureStore from './redux/store';

import Routes from './routes';

const history = createHistory();

export const store = configureStore(api, history);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
