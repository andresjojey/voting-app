import {Map, List} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
  }
  return state;
}
