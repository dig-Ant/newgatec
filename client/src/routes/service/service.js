import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import {  Button, WhiteSpace } from 'antd-mobile';
import styles from './service.less';
import { Route, Switch } from 'dva/router';
import TicketList from '../ticket/ticketList';

class Service extends Component {
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
        <TicketList />
      </div>
    )
  }
}
Service.defaultProps = {

};

Service.propTypes = {

};
function mapStateToProps(state) {
  return {
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
}

export default connect(mapStateToProps)(Service);
