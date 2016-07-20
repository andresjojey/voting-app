import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Tally extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    let tally = this.props.tally;
    let count = 0;

    if (tally && tally.has(entry)) {
      count = tally.get(entry);
    }

    return count;
  }

  goNext() {
    this.props.next();
    if (this.context.router) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className="results">
        <div className="tally">
          {
            this.getPair().map(entry => (
              <div key={entry} className="entry">
                <h1>{entry}</h1>
                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
            ))
          }
        </div>
        <div className="management">
          <button ref="next"
            className="next"
            onClick={::this.goNext}>
            Next
          </button>
        </div>
        <Link to="/">back</Link>
      </div>
    );
  }
}