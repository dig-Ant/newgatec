import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, WhiteSpace, Button, Modal, WingBlank, } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import Password from 'components/Password';
import styles from './salaryPwd.less';

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
  }
  componentWillReceiveProps(props) {
    this.renderModel(props);
  }

  goback = () => {
    this.props.dispatch(routerRedux.push('/homepage'));
  }

  gotoSetPwd = () => {
    this.props.dispatch(routerRedux.push('/registPwd'));
  }

  renderModel = (props) => {
    console.log('willReceiveprop---',props)
    if (props.salaryData.isShowRegistModel) {
      const alertInstance = alert('提示', '您还未设置过查询密码,请前往设置', [
        { text: '返回', onPress: () => this.goback(), style: 'default' },
        { text: '前往设置', onPress: () => this.gotoSetPwd() },
      ]);
    } else if(props.salaryData.isShowPwdModel) {
      const alertInstance = alert('提示', '密码错误,如忘记请重新设置密码', [
        { text: '再看看', onPress: () => console.log('取消'), style: 'default' },
        { text: '前往设置', onPress: () => this.gotoSetPwd() },
      ]);
    }
  }

  onsubmit = () => {
    if(this.state.pwd.length < 6) {
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
            <span>忘记密码</span>
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
