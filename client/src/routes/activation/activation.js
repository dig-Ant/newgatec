import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './activation.less';
import { connect } from 'dva';
import { Button, List, Toast, InputItem } from 'antd-mobile';
import CountDown from 'components/CountDown';


class Activation extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.time = '';
  }



  changeForm(data) {
    this.props.dispatch({
      type: `activation/${data.type}`,
      payload: data.data
    })
    if (data.data.length >= 6 && data.type === 'changeCaptcha') {
      this.onSubmitBtn();
    }
  }
  onClickValid() {

    if (this.props.data.tel.trim().length <= 0) {
      Toast.fail('手机号不能为空',2,null,false);
      return false;//
    }
    this.props.dispatch({
      type: 'activation/getCaptcha'
    })
    return true;
  }

  onSubmitBtn() {
    this.props.dispatch({
      type: 'activation/activeUser'
    })
  }

  render() {
    return (
      <div className={styles.background}>
        <div className={styles.top}>
          <p>只需一步,</p>
          <p>激活您的服务账号</p>
        </div>
        {/* <div className={styles.center}> */}
        <List className={styles.box}>
          <InputItem
            value={this.props.data.name}
            onChange={(data) => this.changeForm({ type: 'changeName', data })}
            className={styles.body}
            placeholder="杨 * *"
            clear
            moneyKeyboardAlign="left"
          >真实姓名:</InputItem>
          <InputItem
            value={this.props.data.tel}
            type={'phone'}
            onChange={(data) => this.changeForm({ type: 'changeTel', data })}
            className={styles.body}
            placeholder="150 6777 33371"
            clear
            moneyKeyboardAlign="left"
          >手机号码:</InputItem>
          <InputItem
            value={this.props.data.captcha}
            onChange={(data) => this.changeForm({ type: 'changeCaptcha', data })}
            type={'money'}
            className={styles.body}
            clear
            moneyKeyboardAlign="left"
            maxLength={6}
          >短信验证:</InputItem>
        </List>

        <CountDown
          count={60} //倒计时
          // buttonStyle={styles.validBtn} //传入的类名
          addClick={this.onClickValid.bind(this)}
        />
        <Button onClick={this.onSubmitBtn.bind(this)} className={styles.submitBtn}>填写完毕, 一键激活</Button>
        {/* </div> */}
        <div className={styles.foot}>
          <p>如您激活失败,</p>
          <p>请联系您所属企业的HR</p>
          <p>或拨打才赋热线 400-99806281, 1</p>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.activation
  }
}
export default connect(mapStateToProps)(Activation);
