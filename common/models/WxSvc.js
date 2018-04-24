'use strict';
var config = require('../../server/config');
var OAuth = require('wechat-oauth');
var WechatAPI = require('wechat-api');
let fs = require('fs');

/**
 * 对函数进行promise封装
 * @method promisify
 * @param {function} fn 待进行promise封装的函数
 * @param {Object} receiver 接收this的对象
 * @return {promise} promise的封装
 * http://www.welefen.com/post/how-to-convert-callback-to-promise.html
 **/
let promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
          fn.apply(receiver, [...args, (err, res) => {
          return err ? reject(err) : resolve(res);
  }]);
  });
  };
};

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
      client.getUser_ify = promisify(client.getUser.bind(client));
      // get access token
      client.getAccessToken_ify = promisify(client.getAccessToken.bind(client));

      WxSvc.Cache.client = client;
    }
    return WxSvc.Cache.client;
  }
  // get api
  WxSvc.getApi = function () {
    WxSvc.CheckCache();
    if (!WxSvc.Cache.api) {
      let api = new WechatAPI(config.wx_appid, config.wx_secret);
      WxSvc.Cache.api = api;
    }
    return WxSvc.Cache.api;
  }
 
  // WxSvc.rebuildUrl = function (url, token) {
  //   let ourl = sys.lib.util.removeQSFromUrl(url, "auth_token");
  //   let conn = ourl.indexOf("?") > 0 ? "&" : "?";
  //   return ourl + conn + "auth_token=" + token
  // }

  WxSvc.defCB = (err, result) => { console.log(err) }


  // WxSvc.getAccessToken = async function (cb) {
  //   let api = WxSvc.getApi();
  //   cb(null)
  // }

  // WxSvc.remoteMethod('getAccessToken', {
  //   http: { verb: 'get' },
  //   accepts: [],
  //   returns: {
  //     arg: 'res', type: 'string'
  //   }
  // })
}