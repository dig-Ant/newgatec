import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
// import Wxtest from './routes/wxtest';
import OAuth from './components/OAuth';
import WxCode from './routes/wxCode';
import TestHomeB from './routes/testHomeB';
import Homepage from './routes/homepage/homepage';
import Activation from './routes/activation/activation';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/homepage" exact component={Homepage} />
        {/* <Route path="/wxtest" exact component={Wxtest} /> */}
        <Route path="/oauth" exact component={OAuth} />
        <Route path="/wxCode" exact component={WxCode} />
        <Route path="/testHomeB" exact component={TestHomeB} />
        <Route path="/active" exact component={Activation} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
