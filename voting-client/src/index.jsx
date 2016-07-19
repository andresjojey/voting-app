import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import configureStore from './configureStore';
import appRouter from './app-router';
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
  <Provider store={store}>{appRouter}</Provider>,
  document.getElementById('app')
);