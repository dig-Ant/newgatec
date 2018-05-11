'use strict';
var config = require('../../server/config');
var OAuth = require('wechat-oauth');
var WechatAPI = require('wechat-api');
let fs = require('fs');
let util = require('../util/util');
let request = require('request');




module.exports = function (WxSvc) {

  WxSvc.CheckCache = function () {
    if (!WxSvc.Cache) {
      WxSvc.Cache = {

      };
    }
  }
  // getclient
  WxSvc.getClient = function () {
    WxSvc.CheckCache();
    if (!WxSvc.Cache.client) {
      let client = new OAuth(config.wx_appid, config.wx_secret);
      // get user info
      client.getUser_ify = util.promisify(client.getUser.bind(client));
      // get access token
      client.getAccessToken_ify = util.promisify(client.getAccessToken.bind(client));

      WxSvc.Cache.client = client;
    }
    return WxSvc.Cache.client;
  }
  // get api
  WxSvc.getApi = function () {
    WxSvc.CheckCache();
    if (!WxSvc.Cache.api) {
      let api = new WechatAPI(config.wx_appid, config.wx_secret);
      api.getTicket_ify = util.promisify(api.getTicket.bind(api));
      api.getJsConfig_ify = util.promisify(api.getJsConfig.bind(api));
      WxSvc.Cache.api = api;
    }
    return WxSvc.Cache.api;
  }


  WxSvc.rebuildUrl = function (url, token) {
    let ourl = util.removeQSFromUrl(url, "auth_token");
    let conn = ourl.indexOf("?") > 0 ? "&" : "?";
    return ourl + conn + "auth_token=" + token
  }

  WxSvc.defCB = (err, result) => { console.log(err) }

  WxSvc.getWxConfig = async function (paramObj) {
    console.log('paramObj---',paramObj);

    let wx_api = WxSvc.getApi(); 

    let ticket_ify = await wx_api.getTicket_ify();
    console.log('ticket_ify---', ticket_ify); 
    var param = {
      debug: paramObj.debug,
      jsApiList: paramObj.jsApiList,
      url: paramObj.url
    };
    let getJsConfig_ify = await wx_api.getJsConfig_ify(param);
    console.log('getJsConfig_ify-',getJsConfig_ify);
    return getJsConfig_ify;
  }

  WxSvc.getAccessToken = async function (code) {
  
    console.log('code---', code);
    let client = WxSvc.getClient();
    // 请求微信 access_token 
    let wx_accessToken = await client.getAccessToken_ify(code.code);
    // 请问 client token
    let wx_userinfo = await client.getUser_ify(wx_accessToken.data.openid);
    //通过请求头返回token
    let requestRes = util.promisify(request.bind(this));
    let wx_tokenResult = await requestRes({
      method: "POST",
      url: "http://10.186.1.222:8888/api/get_access_token",
      // url: "http://172.16.1.139:8888/userhost/api/inner/get_access_token",
      form: {
        openid: wx_accessToken.data.openid,
        api_name: "wx_svc",
      }
    });
    let cf_tokenResult = await requestRes({
      method: "POST",
      url: "http://10.186.1.222:8888/api/get_access_token",
      // url: "http://172.16.1.139:8888/userhost/api/inner/get_access_token",
      form: {
        openid: wx_accessToken.data.openid,
        api_name: "cf_api",
      }
    });
    let token_wx = util.toJson(wx_tokenResult.body).body.access_token;
    let token_cf = util.toJson(cf_tokenResult.body).body.access_token;
    // let api = WxSvc.getApi();
    // cb(null,token)
    console.log('token--', wx_tokenResult.body);
    return {
      token_wx,
      token_cf
    };
  }
  WxSvc.getInfo = async function (code) {

    console.log('res---', code);

    return code;
  }

  WxSvc.remoteMethod('getAccessToken', {
    http: { verb: 'post' },
    accepts: [{ arg: 'code', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'res', type: 'object'
    }
  })

  WxSvc.remoteMethod('getWxConfig', {
    http: { verb: 'post' },
    accepts: [{ arg: 'param', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'body', type: 'object'
    }
  })
  
  WxSvc.remoteMethod('getInfo', {
    http: { verb: 'post' },
    accepts: [{ arg: 'code', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'res', type: 'object'
    }
  })
}