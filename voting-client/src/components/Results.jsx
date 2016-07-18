import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Tally from './Tally';

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

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  };
}

export const ResultsContainer = connect(mapStateToProps)(Results);