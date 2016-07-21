import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action-creators';

export class Voting extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        {
          this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Vote {...this.props} />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: bindActionCreators(actionCreators.vote, dispatch)
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Voting);

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.getIn(['voted', 'entry']),
    winner: state.get('winner')
  };
}