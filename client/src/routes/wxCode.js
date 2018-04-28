import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import sys from '../../core/sys';

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
    let urlQs = sys.lib.util._queryString.getQSJsonWithoutHash();
    return urlQs.code
  }

  render() {
    return (
      <div>
        wxCode page
          <h2>{
            this.props.token
          }</h2>
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
