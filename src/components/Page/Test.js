import React, { Component } from 'react';
import MyMenu from '../Partial/MyMenu'

class Test extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Test">
        <MyMenu />
        <div className="content">
          Test Page
        </div>
      </div>
    );
  }
}

export default Test;
