module.exports = function(MC_Model) {

  MC_Model.method_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{


      switch (obj.mc_method) {
      case 0:
        resolve('ok');
        let _sms = await MC_Model.app.models.MC.sms_creat_mc();
        break;
        
      case 1:
        resolve('ok');
        let _wechat = await MC_Model.app.models.MC.wechat_creat_mc();
        break;
        
      case 2:
        resolve('ok');
        let _email = await MC_Model.app.models.MC.email_creat_mc();
        break;

      case 3:
        
        resolve('ok'); 
        break;

      default:
        reject(new Error('类型错误'));
        break;
      }
    });
  };
};