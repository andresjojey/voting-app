import {createStore} from 'redux';
import reducer from './reducer';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

