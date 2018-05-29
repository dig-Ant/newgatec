import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import request from '../../utils/request';
import NoticeBars from '../../components/NoticeBars/NoticeBars';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'wxSdk/setConfig'
    });
    this.props.dispatch({
      type: 'validUser/getIsVerifyUser'
    });
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
        <NoticeBars type={1 || this.props.noticeData} />
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
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
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
}

export default connect(mapStateToProps)(Homepage);
