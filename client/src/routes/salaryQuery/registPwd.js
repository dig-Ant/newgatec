import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { List, InputItem, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './registPwd.less';
import CountDown from 'components/CountDown';
import { createForm } from 'rc-form';

class RegistPwd extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this.onReset();
  }
  componentWillReceiveProps(props) {

  }
  countDown = () => {
    this.props.dispatch({ type: 'salary/smsSend' });
    return true;
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {
        let formObj = this.props.form.getFieldsValue();
        // formObj.
        this.props.dispatch({
          type: 'salary/setPassword',
          payload: formObj
        });
      } else {
        alert('Validation failed');
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  // 密码和确认密码相同
  validate = (rule, date, callback) => {
    let { getFieldValue } = this.props.form;
    if (getFieldValue('password') != getFieldValue('validPwd')) {
      callback(new Error('不相等'));
    }
    callback();
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={styles.container}>
        <List renderHeader={() => '设置您的查询密码:'}>
          <InputItem
            {...getFieldProps('password', {
              rules: [{ required: true, message: '密码必须填写' }],
            })}
            className={styles.inputPwd}
            type="number"
            placeholder="请输入6位数字密码"
            clear
            maxLength={6}
            error={!!getFieldError('password')}
          >密码</InputItem>
          <InputItem
            {...getFieldProps('validPwd', {
              rules: [
                { required: true, message: '确认密码必须填写' },
                { validator: this.validate },
              ],
            })}
            className={styles.inputPwd}
            type="number"
            placeholder="请重复6位数字密码"
            clear
            maxLength={6}
            error={!!getFieldError('validPwd')}
          >确认密码</InputItem>
          <InputItem
            {...getFieldProps('code', {
              rules: [{ required: true, message: '密码必须填写' }]
            })}
            type="number"
            placeholder="请输入验证码"
            clear
            maxLength={6}
            error={!!getFieldError('code')}
          >验证码</InputItem>
        </List>
        <CountDown addClick={this.countDown} style={{ marginTop: 10, marginBottom: 10 }} count={10} />
        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={this.onSubmit}>提交</Button>
      </div>
    )
  }
}
RegistPwd.defaultProps = {

};

RegistPwd.propTypes = {

};
function mapStateToProps(state) {
  return {
    // salaryData: state.salary
  }
}
const RegistPwdWrapper = createForm()(RegistPwd);
export default connect(mapStateToProps)(RegistPwdWrapper);
