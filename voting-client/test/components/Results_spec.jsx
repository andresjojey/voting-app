import React from 'react';
import ReactDOM , { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5});
    let component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextWasCalled = false;
    const next = () => nextWasCalled = true;
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map();

    let component = renderIntoDocument(
      <Results pair={pair} tally={tally} next={next} />
    );

    Simulate.click(findDOMNode(component.refs.next));

    expect(nextWasCalled).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting"
        pair={["Trainspotting", "28 Days Later"]}
        tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});