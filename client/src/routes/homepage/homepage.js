import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { routerRedux } from 'dva/router'

class Homepage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'homepage/getInfo',
    });
  }

  onActivation() {
    this.props.dispatch(routerRedux.push('/active'));
  }
  render() {
    return (
      <div>
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
        <h2>{this.props.token.token_wx}</h2>
        <h2>{this.props.token.token_cf}</h2>
        <Button
        onClick={this.onActivation.bind(this)}
        >点击激活账号</Button>
      </div>
    )
  }
}
Homepage.defaultProps = {
 
};

Homepage.propTypes = {

};
function mapStateToProps(state) {
  return {
    data: state.homepage.data,
    token: state.handleToken.token
  }
}

export default connect(mapStateToProps)(Homepage);
