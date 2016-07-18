import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state =>
  store.dispatch({type: 'SET_STATE', state})
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);