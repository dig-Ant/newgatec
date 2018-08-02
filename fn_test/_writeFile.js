var writeFile = require('write');

_test = async ()=>{
  try {
     let _file = await writeFile.promise('foo.txt', 'This is content2...');
     console.log(_file);
  } catch (error) {
    console.log(error);
  }
 
}
// _test();
let config = require('../server/config');
// var WechatAPI = require('wechat-api');
// var api = new WechatAPI(config.wx_appid,config.wx_secret);
let app = require('../server/server');
let api = app.models.WxSvc.getApi();
// _OAuth_test = async ()=>{
//   var templateId = '-hJINiqp9NbgsTb1vb8QPJDvKtAErroM7SZRJ80ydRM';
// // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
// var url = 'http://weixin.qq.com/download';
// var data = {
//    "first": {
//      "value":"工资发放通知",
//      "color":"#173177"
//    },
//    "keyword1":{
//      "value":"上海才赋人力资源科技有限公司",
//      "color":"#173177"
//    },
//    "keyword2": {
//      "value":"2018年7月",
//      "color":"#173177"
//    },
//    "keyword3": {
//      "value":"2018年8月1日",
//      "color":"#173177"
//    },
//    "remark":{
//      "value":"感谢您的使用！",
//      "color":"#173177"
//    }
// };
// api.sendTemplate('olFvj0zMTn2buSfANmU8LAp9f5eA', templateId, url, data, (err,result)=>{
//   console.log(err||result);
// });
// };

// _OAuth_test();

// _test_api = async()=>{
//   try {
//     let _send = await app.models.WeChat_Log.wechat_send('hello');
//     console.log(_send);
//   } catch (error) {
//     console.log(error);
//   }
// }
// _test_api();

let moment = require('moment');
moment.locale('zh-cn');
// console.log();
console.log(moment().format('LL'));