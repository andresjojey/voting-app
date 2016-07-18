import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Tally extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
            onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
    );
  }
}