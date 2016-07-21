import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  let winners = getWinners(state.get('vote'));
  let entries = state.get('entries').concat(winners);
  let pairCnt = 2;

  if (entries.size === 1) {
    return state
      .remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        pair: entries.take(pairCnt)
      }),
      entries: entries.skip(pairCnt)
    });
  }
}

function getWinners(vote) {
  var winners;

  if (vote) {
    const tally = vote.get('tally');
    const max = Math.max(...tally.values());

    winners = [...tally.filter(entrie => entrie === max).keys()];
  } else {
    winners = [];
  }

  return winners;
}

export function vote(voteState, entry) {
  const path = ['tally', entry],
    startValue = 0;

  if (voteState.get('pair').includes(entry)) {
    if (!voteState.get('tally')) {
      voteState = voteState.set('tally', Map())
    }

    return voteState.updateIn(
      path,
      startValue,
      tally => tally + 1
    );
  } else {
    return voteState;
  }
}

export const INITIAL_STATE = Map();