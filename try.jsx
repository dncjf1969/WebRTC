import React, { Component } from 'react';

class Try extends Component {
  render() {
    return (
      <li>
        <div>{this.props.tryInfo.Try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    )
  }
}

export default Try