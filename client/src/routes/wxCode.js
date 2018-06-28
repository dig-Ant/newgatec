import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import util from '../utils/util';

class WxCode extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount() {
    let code = this.getCode();
    this.props.dispatch({
      type: 'handleToken/getAccessToken',
      payload: code
    });
  }

  getCode() {
    let urlQs = util._queryString.getQSJsonWithoutHash();
    return urlQs.code
  }

  render() {
    return (
      <div>
          <h2>{
            // this.props.token.token_wx
          }</h2>
          {/* <h2>{
            this.props.token.token_cf
          }</h2> */}
      </div>
    )
  }
}

WxCode.defaultProps = {

}
WxCode.propTypes = {

}

function mapStateToProps(state) {
  return {
    token: state.handleToken.token
  }
}

export default connect(mapStateToProps)(WxCode);
