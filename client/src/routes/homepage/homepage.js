import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, Button } from 'antd-mobile';
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
  test = () => {
    Toast.info('Toast without mask !!!', 2, null, false);
  }
  test1 = () => {
    Toast.fail('Toast without mask !!!', 2, null, false)
  }
  test2 = () => {
    Toast.info('Toast without mask !!!', 2, null, false)
  }
  test3 = () => {
    Toast.loading('Toast without mask !!!', 2, null, false)
  }
  test4 = () => {
    Toast.offline('Toast without mask !!!', 2, null, false)
  }
  test5 = () => {
    Toast.success('Load success !!!', 1);
  }

  render() {
    return (
      <div>
        <NoticeBars type={this.props.noticeData} />
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
        <Button
          onClick={this.onActivation.bind(this)}
        >点击激活账号</Button>
        <Button
          onClick={this.test}
        >info</Button>
        <Button
          onClick={this.test1}
        >fail</Button>
        <Button
          onClick={this.test2}
        >info</Button>
        <Button
          onClick={this.test3}
        >loading</Button>
        <Button
          onClick={this.test4}
        >offline</Button>
        <Button
          onClick={this.test5}
        >success</Button>
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
