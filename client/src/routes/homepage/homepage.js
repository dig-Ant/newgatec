import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
// import sys from '../../../core/sys';

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
  render() {
    return (
      <div>
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
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
    data: state.homepage.data
  }
}
export default connect(mapStateToProps)(Homepage);
