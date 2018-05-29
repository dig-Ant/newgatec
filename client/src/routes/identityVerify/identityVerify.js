import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './identityVerify.less';
import { connect } from 'dva';
import { Button, List, InputItem } from 'antd-mobile';
import { routerRedux } from 'dva/router';

class IdentityVerify extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.time = '';
  }


  onSubmitBtn() {
    this.props.dispatch({
      type: 'activation/activeUser'
    })
  }

  onClickGoback() {
    alert(1);
  }

  onClickVerify() {
    this.props.dispatch(routerRedux.push('/verifyForm'));
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <p>接下来,</p>
          <p>需要验证您的身份</p>
        </div>
        <div className={styles.center}>
          <p>当需要为您提供涉及社保公积金、薪资福利、保险理赔等涉及个人隐私的业务，或因企业安全要求时，需要哦您进行完成身份验证。</p>
          <p>这个过程大致需要2分钟。</p>
          <p>请您提前准备好证明身份证。</p>
        </div>
        <div className={styles.foot}>
          <Button
            onClick={this.onClickVerify.bind(this)}
            className={styles.verifyBottom}>我知道了,开始验证</Button>
          <span onClick={this.onClickGoback.bind(this)}>以后再说</span>
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
export default connect()(IdentityVerify);
