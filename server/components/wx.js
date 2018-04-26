var wechat = require('wechat');
let config = require('../config');

module.exports = function (loopbackApplication, options) {

  loopbackApplication.use(options.path, function (req, res, next) {
    let passed = wechat.checkSignature(req.query, config.wx_token)
    if (passed) {
      res.send(req.query.echostr);
    }
    else {
      res.send("您的服务是正常的,可放心进行微信设定...");
    }
  });

  // loopbackApplication.use("/wx/page", function (req, res, next) {
  //   res.send("<a style='font-size:40px' href='http://" + sys.cfg.sys.wx_cb_domain + "/wx/auth'>click me -- domain </a><p> 1</p><p>1</p><p>1</p><p>1</p><a href='http://172.16.1.112:33333/wx/auth'>click me -- local</a>" + req.url)
  // });

  loopbackApplication.use("/wx/auth", function (req, res, next) {
    let client = loopbackApplication.models.WxSvc.getClient();
    var url = client.getAuthorizeURL(`http://${config.wx_cb_domain}/wx/redir`, req.query.path, 'snsapi_userinfo');
    console.log(url);
    res.redirect(url);
  });

  loopbackApplication.use("/wx/redir", async function (req, res, next) {
    let client = loopbackApplication.models.WxSvc.getClient();
    // get access_token
    let resObj = await client.getAccessToken_ify(req.query.code);

    // get userinfo
    let ui = await client.getUser_ify(resObj.data.openid);
    // -- save userinfo to database
    //use openid to call usercenter to get token
    let token = 'asdfsd';
    let resUrl = loopbackApplication.models.WxSvc.rebuildUrl(req.query.state,token);
    
    res.redirect(resUrl);
  });
};