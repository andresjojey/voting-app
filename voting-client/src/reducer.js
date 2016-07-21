import {Map, List} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    case 'NEXT':
      return next(state);
  }

  return state;
}

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);

  if (currentPair && currentPair.includes(entry)) {
    return state.set('voted', Map({
      id: state.getIn(['vote', 'id']),
      entry
    }));
  } else {
    return state;
  }
}

function resetVote(state) {
  const votedId = state.getIn(['voted', 'id']);
  const currentId = state.getIn(['vote', 'id']);

  if (currentId !== votedId) {
    return state.remove('voted');
  } else {
    return state;
  }
}

function next(state) {
  return state;
}