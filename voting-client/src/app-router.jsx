import React from 'react';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const routes = (
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>
);

export default (
  <Router history={hashHistory}>{routes}</Router>
);