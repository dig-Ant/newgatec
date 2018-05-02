import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'dva';
import styles from './IndexPage.css';
import AuthPage from '../components/AuthPage';

class Test extends AuthPage {
  constructor() {
    super();
    this.state = {
      log: ''
    }
  }
  // componentWillMount() {
  //   this.setState({
  //     log: window.navigator.userAgent
  //   })
  // }
  onClick() {
    alert('remove');
    window.localStorage.removeItem('auth_token');
  }
  renderContent() {
    console.log();
    return (
      <div>
        <h1>哈哈哈</h1>
        {/* <p>{ JSON.stringify() }</p> */}
        {/* <p>使用的浏览器: {this.state.log}</p> */}
        <p>
          {/* {
            this.state.log.indexOf('MicroMessenger') > 0 ? '微信浏览器' : '其他浏览器'
          } */}
        </p>
        <button onClick={this.onClick.bind(this)}>清除localstorage</button>
      </div>
    )
  }
}

export default connect()(Test);
