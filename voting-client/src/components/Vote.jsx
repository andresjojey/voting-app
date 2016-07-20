import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getPair() {
    return this.props.pair || [];
  }
  isDisabled() {
    return !!this.props.hasVoted;
  }
  hasVotedFor(entry) {
    return entry === this.props.hasVoted;
  }
  render() {
    return (
      <div>
        {
          this.getPair().map(entry =>
            <button key={entry}
              disabled={this.isDisabled()}
              onClick={() => this.props.vote(entry)}>
              <h1>{entry}</h1>
              {
                this.hasVotedFor(entry) ?
                  <div className="label">Voted</div> :
                  null
              }
            </button>)
        }
        <br/>
        <Link to="/results">Results</Link>
      </div>
    );
  }
}