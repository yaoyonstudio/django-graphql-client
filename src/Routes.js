import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Page/Home';
import Article from './components/Page/Article';
import Profile from './components/Page/Profile';
import Info from './components/Page/Info';
import Test from './components/Page/Test';

class Routes extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/article" component={Article}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/info" component={Info}/>
          <Route exact path="/test" component={Test}/>
        </Switch>
      </div>
    );
  }
}

export default Routes
