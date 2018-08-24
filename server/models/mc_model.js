module.exports = function(MC_Model) {

  MC_Model.method_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      try {
        let result = {};
        if (obj.mc_method.sms == true) {
          let _sms = await MC_Model.app.models.MC.sms_creat_mc(obj);
          console.log('sms',_sms.body);
          result._sms = _sms.body;
        }
        if (obj.mc_method.wechaat == true) {
          let _wechat = await MC_Model.app.models.MC.wechat_creat_mc(obj);
          console.log('_wechat',_wechat);
          result._wechat = _wechat.body;
        }
        if (obj.mc_method.email == true) {
          let _email = await MC_Model.app.models.MC.email_creat_mc(obj);
          console.log('_email',_email);
          result._email = _email.body;
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }

    });
  };
};