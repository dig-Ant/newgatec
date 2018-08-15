module.exports = function(MC) {

  MC.sms_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      switch (obj.business) {
      case 0://薪资提醒
          
        break;
      case 1:
          
        break;

      case 2:
          
        break;
      case 3:
          
        break;
      default:
        break;
      }
    });
  };

  MC.wechat_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      let input = {};
      switch (obj.business) {
      case 0://薪资提醒
        input.openid = obj.openid;
        input.templateId = obj.sms_templateId;
        input.header = obj.header;
        input.clt_name = obj.clt_name;
        break;
      case 1:
          
        break;

      case 2:
          
        break;
      case 3:
          
        break;
      default:
        break;
      }
    });
  };

  MC.email_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      switch (obj.business) {
      case 0:
          
        break;
      case 1:
          
        break;

      case 2:
          
        break;
      case 3:
          
        break;
      default:
        break;
      }
    });
  };
  
};