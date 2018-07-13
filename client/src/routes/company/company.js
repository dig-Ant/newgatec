import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import {  Button, WhiteSpace } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import NoticeBars from 'components/NoticeBars';
import cfg from '../../config/cfg';
import styles from './company.less';
import { homepage } from '../../assets';
import { Router, Route, Switch } from 'dva/router';
import TicketList from '../ticket/ticketList';
import home from '../../assets/home';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {

  }

  salaryBtn = () => {
    this.props.dispatch({
      type: 'salary/jumpPage',
      payload: 'salaryList'
    })
  }
  welfareBtn = () => {
    this.props.dispatch({
      type: 'salary/jumpPage',
      payload: 'welfareList'
    })
  }
  render() {
    return (
      <div className={styles.container}>
        {/* header */}
        <Button
          onClick={this.salaryBtn}
        >薪资查询</Button><WhiteSpace /><WhiteSpace />
        <Button
          onClick={this.welfareBtn}
        >社保公积金</Button><WhiteSpace /><WhiteSpace />
      </div>
    )
  }
}
Home.defaultProps = {

};

Home.propTypes = {

};
function mapStateToProps(state) {
  return {
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
}

export default connect(mapStateToProps)(Home);
