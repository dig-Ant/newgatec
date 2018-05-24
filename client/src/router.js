import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import OAuth from './components/OAuth';
import WxCode from './routes/wxCode';
import TestHomeB from './routes/testHomeB';
import Homepage from './routes/homepage/homepage';
import Activation from './routes/activation/activation';
import IdentityVerify from './routes/identityVerify/identityVerify';
import VerifyForm from './routes/identityVerify/verifyForm';
// 结果页
import ResSuccess from './routes/resultPage/resSuccess';
import ResFail from './routes/resultPage/resFail';
import ResAwait from './routes/resultPage/resAwait';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/oauth" exact component={OAuth} />
        <Route path="/wxCode" exact component={WxCode} />
        <Route path="/testHomeB" exact component={TestHomeB} />
        <Route path="/active" exact component={Activation} />
        <Route path="/identityVerify" exact component={IdentityVerify} />
        <Route path="/verifyForm" exact component={VerifyForm} />
        {/* 结果页 */}
        <Route path="/resSuccess" exact component={ResSuccess} />
        <Route path="/resFail" exact component={ResFail} />
        <Route path="/resAwait" exact component={ResAwait} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
