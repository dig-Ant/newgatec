import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './resPage.less';
import { connect } from 'dva';
import { Result, Icon, WhiteSpace, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';


class ResSuccess extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  renderTitle = () => {
    return (
      <div className={styles.title}>
        <p>您的身份验证已提交人工审核, 预计在48小时内完成。</p>
      </div>
    )
  }

  // 点击返回首页
  onClickSuccess = () => {
    this.props.dispatch(routerRedux.replace('/home'));
  }

  renderMessage = () => {
    return (
      <div>
        <Button onClick={this.onClickSuccess}>好的!</Button><WhiteSpace />

      </div>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        <Result
          img={<img src="https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg" alt="" style={{ width: 100, height: 100 }} />}
          title={this.renderTitle()}
          message={this.renderMessage()}
          className={styles.result}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}
export default connect()(ResSuccess);
