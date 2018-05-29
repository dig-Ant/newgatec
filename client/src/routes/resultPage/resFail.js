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
        <p>抱歉!</p>
        <p>您没有通过AI预审。</p>
      </div>
    )
  }
  onClickSuccess = () => {
    this.props.dispatch(routerRedux.replace('/homepage'));
  }
  onClickFail = () => {
    this.props.dispatch({
      type: 'validUser/getApplyManualReview'
    });
    this.props.dispatch(routerRedux.replace('/resAwait'));
  }
  renderMessage = () => {
    return (
      <div>
        <Button onClick={this.onClickSuccess}>重新填写身份信息</Button>
        <div className={styles.subButton}>
          <Button onClick={this.onClickFail}>提交客服人工审核</Button>
        </div>
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
