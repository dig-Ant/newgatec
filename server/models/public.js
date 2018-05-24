let jsonCheck = require('../../common/smsFn/jsonCheck')
let enums = require('../../common/core/enum')

// 旧 wx_svc
var config = require('../../server/config');
var OAuth = require('wechat-oauth');
var WechatAPI = require('wechat-api');
let fs = require('fs');
let util = require('../util/util');
let request = require('request');



module.exports = function (Public) {


  Public.testAnon = async function (obj, cb) {
    let result = 0
    if (obj.test == '1') {
      result = 1
    }
    return result; 



  }

  Public.smsCodeSend = async (obj, cb) => {
    try {
      let input = {
        phone: obj.phone,
        type: 1,
        sign: "675",
        modelId: "3839",
        content: "{code}",
        codeType: 1
      }
      let jsonKeys = ['phone']
      let objCheck = await jsonCheck.keysCheck(jsonKeys, obj)
      let result = await Public.app.models.Sms.smsCode(input);
      return result;
    } catch (error) {
      // enums.error.msg=error.message
      // error.statusCode = 412
      cb(error)
    }

  }
  Public.smsCodeCheck = async (obj, cb) => {
    try {
      let input = {
        phone: obj.phone,
        code: obj.code,
        codeType: 1

      }
      let jsonKeys = ['phone', 'code']
      let objCheck = await jsonCheck.keysCheck(jsonKeys, obj);
      let result = await Public.app.models.Sms.checkCode(input);
      return result;
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  Public.groupSms = async () => {
    try {

    } catch (error) {

    }
  }




  Public.remoteMethod('smsCodeSend', {
    accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

    returns: { arg: 'body', type: 'object' }
  });
  Public.remoteMethod('smsCodeCheck', {
    accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

    returns: { arg: 'body', type: 'object' }
  });

  // wx_svc
  Public.CheckCache = function () {
    if (!Public.Cache) {
      Public.Cache = {

      };
    }
  }
  // getclient
  Public.getClient = function () {
    Public.CheckCache();
    if (!Public.Cache.client) {
      let client = new OAuth(config.wx_appid, config.wx_secret);
      // get user info
      client.getUser_ify = util.promisify(client.getUser.bind(client));
      // get access token
      client.getAccessToken_ify = util.promisify(client.getAccessToken.bind(client));

      Public.Cache.client = client;
    }
    return Public.Cache.client;
  }
  // get api
  Public.getApi = function () {
    Public.CheckCache();
    if (!Public.Cache.api) {
      let api = new WechatAPI(config.wx_appid, config.wx_secret);
      api.getTicket_ify = util.promisify(api.getTicket.bind(api));
      api.getJsConfig_ify = util.promisify(api.getJsConfig.bind(api));
      Public.Cache.api = api;
    }
    return Public.Cache.api;
  }


  Public.rebuildUrl = function (url, token) {
    let ourl = util.removeQSFromUrl(url, "auth_token");
    let conn = ourl.indexOf("?") > 0 ? "&" : "?";
    return ourl + conn + "auth_token=" + token
  }

  Public.defCB = (err, result) => { console.log(err) }

  Public.getWxConfig = async function (paramObj) {
    console.log('paramObj---', paramObj);

    let wx_api = Public.getApi();

    let ticket_ify = await wx_api.getTicket_ify();
    var param = {
      debug: paramObj.debug,
      jsApiList: paramObj.jsApiList,
      url: paramObj.url
    };
    let getJsConfig_ify = await wx_api.getJsConfig_ify(param);
    console.log('getJsConfig_ify-', getJsConfig_ify);
    return getJsConfig_ify;
  }

  async function requestToken(url, data) {
    let requestRes = util.promisify(request.bind(this));
    let token = await requestRes({
      method: "POST",
      url: url,
      form: data
    });
    return token;
  }


  Public.getAccessToken = async function (code) {

    console.log('code---', code);
    let client = Public.getClient();
    // 请求微信 access_token 
    let wx_accessToken = await client.getAccessToken_ify(code.code);
    // 请问 client token
    let wx_userinfo = await client.getUser_ify(wx_accessToken.data.openid);
    //通过请求头返回token

    let getTokenUrl = 'http://172.16.1.139:8888/api/inner/get_access_token';
    let token_wx_svc = await requestToken(getTokenUrl, {
      openid: wx_accessToken.data.openid,
      api_name: "wx_svc",
    });
    let token_userpublic = await requestToken(getTokenUrl, {
      openid: wx_accessToken.data.openid,
      api_name: "userpublic",
    });
    let token_userprivate = await requestToken(getTokenUrl, {
      openid: wx_accessToken.data.openid,
      api_name: "userprivate",
    });
    let tokenObj = {
      token_wx_svc: util.toJson(token_wx_svc.body).body.access_token,
      token_userpublic: util.toJson(token_userpublic.body).body.access_token,
      token_userprivate: util.toJson(token_userprivate.body).body.access_token,
    }

    // let api = Public.getApi();
    // cb(null,token)
    console.log('token1--', tokenObj);
    return tokenObj;
  }
  Public.getInfo = async function (code) {

    console.log('res---', code);

    return code;
  }

  Public.remoteMethod('getAccessToken', {
    http: { verb: 'post' },
    accepts: [{ arg: 'code', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'body', type: 'object'
    }
  })

  Public.remoteMethod('getWxConfig', {
    http: { verb: 'post' },
    accepts: [{ arg: 'param', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'body', type: 'object'
    }
  }) 

  Public.remoteMethod('getInfo', {
    http: { verb: 'post' },
    accepts: [{ arg: 'code', type: 'object', http: { source: 'body' } }],
    returns: {
      arg: 'body', type: 'object'
    }
  })


}