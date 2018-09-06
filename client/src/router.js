import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import OAuth from './components/OAuth';
import WxCode from './routes/wxCode';
import TestHomeB from './routes/testHomeB';
// 主页
import Home from './routes/homepage/home';
import Homepage from './routes/homepage/homepage';
import Activation from './routes/activation/activation';
import IdentityVerify from './routes/identityVerify/identityVerify';
import VerifyForm from './routes/identityVerify/verifyForm';
// 结果页
import ResSuccess from './routes/resultPage/resSuccess';
import ResFail from './routes/resultPage/resFail';
import ResAwait from './routes/resultPage/resAwait';
// 薪资查询页
import SalaryPwd from './routes/salaryQuery/salaryPwd';
import RegistPwd from './routes/salaryQuery/registPwd';
import SalaryList from './routes/salaryQuery/salaryList';
import SalaryData from './routes/salaryQuery/salaryData';
import Complaint from './routes/salaryQuery/complaint';
// 社保公积金查询页面
import WelfareList from './routes/welfare/welfareList';
import WelfareData from './routes/welfare/welfareData';
// ticket 服务请求页面
import Ticket from './routes/ticket/ticket';
import TicketReuslt from './routes/ticket/ticketResult';
import TicketList from './routes/ticket/ticketList';
import TicketInfo from './routes/ticket/ticketInfo';
import TicketFail from './routes/ticket/ticketFail';
// 企业 注册页面
import RegisterForm from './routes/company/registerForm';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home/:route?" component={Home} />
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/oauth" exact component={OAuth} />
        <Route path="/wxCode" exact component={WxCode} />
        <Route path="/testHomeB" exact component={TestHomeB} />
        <Route path="/active" exact component={Activation} />
        {/* 身份验证页 */}
        <Route path="/identityVerify" exact component={IdentityVerify} />
        <Route path="/verifyForm" exact component={VerifyForm} />
        {/* 结果页 */}
        <Route path="/resSuccess" exact component={ResSuccess} />
        <Route path="/resFail" exact component={ResFail} />
        <Route path="/resAwait" exact component={ResAwait} />
        {/* 薪资查询页面 */}
        <Route path="/salaryPwd" exact component={SalaryPwd} />
        <Route path="/registPwd" exact component={RegistPwd} />
        <Route path="/salaryList" exact component={SalaryList} />
        <Route path="/salaryData/:id?" exact component={SalaryData} />
        <Route path="/complaint" exact component={Complaint} />

        <Route path="/welfareList" exact component={WelfareList} />
        <Route path="/welfareData/:id?" exact component={WelfareData} />
        {/* ticket 服务请求页面 */}
        <Route path="/ticket" exact component={Ticket} />
        <Route path="/ticketRes" exact component={TicketReuslt} />
        <Route path="/ticketList" exact component={TicketList} />
        <Route path="/ticketInfo/:tkt_key" exact component={TicketInfo} />
        <Route path="/ticketFail/:tkt_key?"  component={TicketFail} />
        <Route path="/registerForm/:step?"  component={RegisterForm} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
