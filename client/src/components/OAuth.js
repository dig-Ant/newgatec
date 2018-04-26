import React from 'react';
import propTypes from 'prop-types';
import sys from '../../core/sys';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class OAuth extends React.Component {
  constructor() {
    super();
    this.buildWxUrl = this.buildWxUrl.bind(this);
    this.getToken = this.getToken.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.checkBrower = this.checkBrower.bind(this);
  }

  componentWillMount() {
    let url = this.buildWxUrl();
    console.log(url)
    this.checkToken();
  }
  //判断是否是微信浏览器
  checkBrower() {
    let isWx = sys.lib.util._isWx.isWxBrower();
    return isWx;
  }

  buildWxUrl() {
    let encodeRedirect = encodeURIComponent(sys.cfg.wxCfg.redirect_uri);
    let Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${sys.cfg.wxCfg.appid}&redirect_uri=${encodeRedirect}&response_type=code&scope=${sys.cfg.wxCfg.scope}&state=${sys.cfg.wxCfg.wxState}#wechat_redirect`;

    return Url;

  }

  getToken() {
    let url = this.buildWxUrl();
    window.location.href = url;
    return;
  }

  checkToken() {
    let token = window.localStorage.getItem('auth_token1');
    if (!token) {
      let isWx = this.checkBrower();
      if (isWx) {
        this.getToken();
      } else {
        console.log('不是微信浏览器,跳转到登录页');
        //跳转到登录授权页面
        this.props.dispatch(routerRedux.push('/testHomeB'));
      }
    }
  }

  render() {
    return (
      <div>
        <h1>正在验证...</h1>
      </div>
    )
  }
}

export default connect()(OAuth);