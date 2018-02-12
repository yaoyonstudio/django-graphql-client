import React, { Component } from 'react';

class Loading extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Loading">
        <p>正在加载中...</p>
      </div>
    );
  }
}

export default Loading;
