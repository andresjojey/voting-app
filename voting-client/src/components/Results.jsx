import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Winner from './Winner';
import Tally from './Tally';
import * as actionCreators from '../action-creators';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      this.props.winner ?
        <Winner ref="winner" winner={this.props.winner}/> :
        <Tally {...this.props} />
    );
  }
}

export const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);

function mapDispatchToProps(dispatch) {
  return {
    next: bindActionCreators(actionCreators.next, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  };
}