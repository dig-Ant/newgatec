
let jsonCheck = require('../../common/smsFn/jsonCheck')
let enums = require('../../common/core/enum')
module.exports = function(Anon) {


  Anon.testAnon = async function (obj, cb) {
    let result = 0
    if(obj.test == '1'){
      result = 1
    }
      return result;
    
  
    
  }

  Anon.smsCodeSend = async (obj,cb)=>{
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
      let result = await Anon.app.models.Sms.smsCode(input);
      return result;
    } catch (error) {
      // enums.error.msg=error.message
      // error.statusCode = 412
      cb(error)
    }
   
  }
  Anon.smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        code:obj.code,
        codeType:1
        
        }
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Anon.app.models.Sms.checkCode(input);
        return result;
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  Anon.groupSms = async () =>{
    try {
      
    } catch (error) {
      
    }
  }

  

  Anon.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Anon.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

}