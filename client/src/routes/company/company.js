import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, WhiteSpace } from 'antd-mobile';
import styles from './company.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
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
        <div className={styles.welfareBtn} onClick={this.welfareBtn}>
          <img src={companyImg.welfare} alt="" />
          <p>社保公积金</p>
        </div>
        <div className={styles.salaryBtn} onClick={this.salaryBtn}>
          <img src={companyImg.salary} alt="" />
          <p>工资条</p>
        </div>
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