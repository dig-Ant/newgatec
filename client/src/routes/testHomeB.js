import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'dva';

class TestHomeB extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>普通浏览器 登录页</h1>
      </div>
    )
  }
}

export default connect()(TestHomeB);
