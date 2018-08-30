var rp = require('request-promise');

module.exports = function(MC) {

  MC.sms_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        
        switch (obj.business) {
        case 1://薪资提醒
          obj.content=obj.pay_time;
          resolve(obj);
          break;
        
        case 2:
          resolve(obj);
          break;
        case 3:
          resolve(obj);
          break;
        default:
          resolve(obj);
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
        
        switch (obj.business) {
        case 1://薪资提醒
          
          resolve(obj);
          break;

        case 2:
          resolve(obj);
          break;
        case 3:
          resolve(obj);
          break;
        default:
          resolve(obj);
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
  MC.mc_send = (obj) =>{
    return new Promise(async (resolve,reject)=>{
      try {
        
        var options = {
          method: 'POST',
          uri: obj.url,
          body: obj,
          json: true // Automatically stringifies the body to JSON
        };
        console.log('mc_send',obj);
        let result = rp(options);
        resolve(result);
        // resolve(obj);
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };
  

};