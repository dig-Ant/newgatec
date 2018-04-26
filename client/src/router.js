import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Wxtest from './routes/wxtest';
import OAuth from './components/OAuth';
import TestHomeA from './routes/testHomeA';
import TestHomeB from './routes/testHomeB';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/wxtest" exact component={Wxtest} />
        <Route path="/oauth" exact component={OAuth} />
        <Route path="/testHomeA" exact component={TestHomeA} />
        <Route path="/testHomeB" exact component={TestHomeB} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
