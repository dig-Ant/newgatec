var rp = require('request-promise');

module.exports = function(MC) {

  MC.sms_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        let input = {};
        var options = {
          method: 'POST',
          uri: null,
          body: null,
          json: true // Automatically stringifies the body to JSON
        };
        switch (obj.business) {
        case 1://薪资提醒
          input.phone = obj.phone;
          input.sign = obj.sign||'675';
          input.modelId = obj.modelId||'9465';
          input.content = obj.pay_time;
          options.uri = 'http://localhost:33332/api/inner/smsSend',//网络地址
        options.body = input;
          let result = await rp(options);
          resolve(result);
          break;
        
        case 2:
          resolve('ok');
          break;
        case 3:
          resolve('ok');
          break;
        default:
          resolve('ok');
          break;
        }
      } catch (error) {
        reject(error);
      }
      
    });
  };

  MC.wechat_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        let input = {};
        var options = {
          method: 'POST',
          uri: null,
          body: null,
          json: true // Automatically stringifies the body to JSON
        };
        switch (obj.business) {
        case 1://薪资提醒
          input.openid = obj.openid;
          input.templateId = obj.wechat_templateId;
          input.header = obj.header;
          input.cst_name = obj.cst_name;
          input.pay_time = obj.pay_time;
          input.footer = obj.footer;
          options.uri = 'http://localhost:33332/api/inner/wechat_send',//网络地址
          options.body = input;
          let result = await rp(options);
          resolve(result);
          break;

        case 2:
          resolve('ok');
          break;
        case 3:
          resolve('ok');
          break;
        default:
          resolve('ok');
          break;
        }
      } catch (error) {
        reject(error);
      }
    
    });
  };

  MC.email_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      switch (obj.business) {
      
      case 1:
        resolve('ok');
        break;

      case 2:
        resolve('ok');
        break;
      case 3:
        resolve('ok');
        break;
      default:
        break;
      }
    });
  };
  
};