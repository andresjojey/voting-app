import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import configureStore from './configureStore';
import routes from './routes';
import {setState} from './action-creators';
import remoteActionMiddleware from './remote-action-middleware';

const initialState = void 0;

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const store = configureStore(
  initialState,
  remoteActionMiddleware(socket)
);

socket.on('state', state =>
  store.dispatch(setState(state))
);

render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);