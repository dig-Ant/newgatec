import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'dva';
import sys from '../../core/sys';

class TestHomeA extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        微信目标页面A
        <h1>{
          JSON.stringify(sys.lib.util._queryString.getQSJsonWithoutHash(window.location.href))
          }</h1>
          <h2>{window.location.href}</h2>
          <h2>{JSON.stringify(this.props.history)}</h2>
      </div>
    )
  }
}

export default connect()(TestHomeA);
