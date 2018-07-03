import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, WhiteSpace, Button, Modal, WingBlank, } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import Password from 'components/Password';
import styles from './salaryPwd.less';
import util from 'utils/util';

const alert = Modal.alert;

class SalaryPwd extends Component {
  constructor() {
    super();
    this.state = {
      pwd: ''
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'salary/getPlantStatus'
    });
    let queryString = util._queryString.getQSJson();
    console.log(queryString);
    if (queryString.btn) {
      this.props.dispatch({
        type: 'salary/changeBtn',
        payload: queryString.btn === 'salary' ? 'salaryList' : 'welfareList'
      });
    }
  }
  componentWillReceiveProps(props) {
    this.renderModel(props);
  }

  goback = () => {
    this.props.dispatch(routerRedux.push('/homepage'));
  }

  gotoSetPwd = () => {
    this.props.dispatch(routerRedux.replace('/registPwd'));
  }

  renderModel = (props) => {
    if (props.salaryData.isShowRegistModel) {
      const alertInstance = alert('提示', '您还未设置过查询密码,请前往设置', [
        { text: '返回', onPress: () => this.goback(), style: 'default' },
        { text: '前往设置', onPress: () => this.gotoSetPwd() },
      ]);
    }
  }

  onsubmit = () => {
    if (this.state.pwd.length < 6) {
      return Toast.fail('您好,密码为是6位数', 2);
    }
    this.props.dispatch({
      type: 'salary/salaryLogin',
      payload: {
        password: this.state.pwd
      }
    });
  }

  pwdChange = (value) => {
    this.setState({ pwd: value });
  }
  forgotClick = () => {
    this.props.dispatch(routerRedux.replace('/registPwd'));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.title}>请输入查询密码</div>
          <div className={styles.pwd}>
            <Password onChange={this.pwdChange} />
          </div>
          <div className={styles.btn}>
            <Button onClick={this.onsubmit}>确认</Button>
          </div>
          <div className={styles.foot}>
            <span onClick={this.forgotClick}>忘记密码</span>
          </div>
        </div>
      </div>
    )
  }
}
SalaryPwd.defaultProps = {

};

SalaryPwd.propTypes = {

};
function mapStateToProps(state) {
  return {
    salaryData: state.salary
  }
}

export default connect(mapStateToProps)(SalaryPwd);
