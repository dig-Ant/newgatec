let app = require('../../server/server');
// let api = app.models.WxSvc.getApi();

module.exports = function (WeChat_Log) {

  WeChat_Log.wechat_send = (obj) => {
    let api = app.models.WxSvc.getApi();
    return new Promise((resolve, reject) => {

      api.sendTemplate(obj.openid, obj.templateId, obj.url, obj.data, async (err, result) => {
        if (err) {
          console.log('err', err);
          reject(err);
        } else {
          try {
            let _log_save = await WeChat_Log.upsert({
              openid: obj.openid,
              templateId: obj.templateId,
              url: obj.url,
              data: obj.data,
              msgid: result.msgid
            });
            console.log(_log_save);
          } catch (error) {
            console.log(error);
          }
          resolve(result);
        }

      });
    });
  };
}