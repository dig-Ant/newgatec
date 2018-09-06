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
        <p>恭喜!</p>
        <p>您的身份已通过AI验证。</p>
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
        <Button onClick={this.onClickSuccess}>太棒了!</Button><WhiteSpace />
      </div>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        <Result
          img={<Icon type="check-circle" className={styles.img} style={{ fill: '#1F90E6' }} />}
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
