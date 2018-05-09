let jsonCheck = require('../../common/core/jsonCheck')
let enums = require('../../common/core/enum')
module.exports = function(Private) {


  Private.testAnon = async function (obj, cb) {
    let result = 0
    if(obj.test == '1'){
      result = 1
    }
      return result;
    
  
    
  }

  Private.smsCodeSend = async (obj,cb)=>{
    try {
      let input = {
      phone:obj.phone,
      type:1,
      sign:"675",
      modelId:"3839",
      content:"{code}",
      codeType:1
      }
      let jsonKeys = ['phone']
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj)
      let result = await Private.app.models.Sms.smsCode(input);
      return result;
    } catch (error) {
      // enums.error.msg=error.message
      // error.statusCode = 412
      cb(error)
    }
   
  }
  Private.smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        code:obj.code,
        codeType:1
        
        }
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Private.app.models.Sms.checkCode(input);
        return result;
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  
  Private.groupSms = async () =>{
    try {
      
    } catch (error) {
      
    }
  }

  Private.smsCodeGroup = async (obj,cb)=>{

       let sendTime = 10*1000*60
        let dateNow = new Date().getTime();
        let timeJson = new Date(dateNow+28800000+sendTime)
        let timeStr = timeJson.toJSON().slice(0, 19).replace('T', ' ')
    try {
      let input = {
        phones:obj.phones,
        sign:obj.sing||"675",
        modelId:obj.sing||"767",
        content:obj.content||'',
        time:obj.time||timeStr
        
        }
     
        
        let jsonKeys = ['phones']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Private.app.models.Sms.groupSms(input);
        return result; 
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }

  Private.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('smsCodeGroup', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

}