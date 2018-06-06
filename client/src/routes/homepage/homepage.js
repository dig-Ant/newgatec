import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, WhiteSpace, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import NoticeBars from 'components/NoticeBars';

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

  salaryBtn = () => {
    //点击 发送请求 
    this.props.dispatch(routerRedux.push('/salaryPwd'))
    // this.props.dispatch({
    //   type: 'salary/getPlantStatus'
    // })
  }

 
  render() {
    return (
      <div>
        <NoticeBars type={this.props.noticeData} />
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
        <Button
          onClick={this.onActivation.bind(this)}
        >点击激活账号</Button><WhiteSpace />
        <Button
          onClick={this.salaryBtn}
        >薪资查询</Button>
     
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
