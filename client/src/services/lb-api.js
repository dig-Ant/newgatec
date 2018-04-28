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
  
  getWxSvcroute() {
    return `${this.getBaseRoute()}/WxSvcs`
  }

  // get accessToken 
  getAccessTokenRoute() {
    return `${this.getWxSvcroute()}/getAccessToken`
  }

  // test api
  getInfoRoute() {
    return `${this.getWxSvcroute()}/getInfo`
  }
}