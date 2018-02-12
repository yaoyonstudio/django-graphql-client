import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes {...this.props} />
      </BrowserRouter>
    );
  }
}

export default App;
