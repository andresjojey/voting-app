import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();

store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);