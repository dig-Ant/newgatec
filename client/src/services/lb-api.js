'use strict';

// loopback request uri path
export default class lbapi {
  constructor() {
    this.url = ""
  }

  // base request path
  getBaseRoute() {
    return `${this.url}`;
  }
  
  getWxSvcRoute() {
    return `${this.getBaseRoute()}/WxSvcs`
  }

  // get accessToken 
  getAccessTokenRoute() {
    return `${this.getWxSvcRoute()}/getAccessToken`
  }

  // test api
  getInfoRoute() {
    return `${this.getWxSvcRoute()}/getInfo`
  }

  // 短信相关基础route
  getSmsRoute() {
    return `${this.getBaseRoute()}/Anons`
  }

  // 发送短信验证码
  getSmsCodeRoute() {
    return `${this.getSmsRoute()}/codeSms`
  }

  // 激活手机号
  getUserActivateRoute() {
    return `${this.getBaseRoute()}/user_activate`
  }
}