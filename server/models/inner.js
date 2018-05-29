let jsonCheck = require('../../common/smsFn/jsonCheck')
let enums = require('../../common/core/enum')
module.exports = function(Inner) {


  Inner.testAnon = async function (obj, cb) {
    let result = 0
    if(obj.test == '1'){
      result = 1
    }
      return result;
    
  
    
  }

  Inner.smsCodeSend = async (obj,cb)=>{
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
      let result = await Inner.app.models.Sms.smsCode(input);
      return result;
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
   
  }
  Inner.smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:1,
        status:0,
        expirationTime:{gt: new Date()}
        }
        
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Inner.app.models.SmsCode.findOne({where:input})
        if(result==null){
          cb(new Error('验证码错误'))
        }else{
          let smsUpdateStatus = await Inner.app.models.SmsCode.updateAll({where:input}, { status: 1 })
          return enums.success;
        }
        
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  Inner.registerCodeCheck = async (obj,cb) =>{
    try {
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:1,
        status:0,
        expirationTime:{gt: new Date()}
        }
        
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Inner.app.models.SmsCode.findOne({where:input})

        if(result==null){
          cb(new Error('验证码错误'))
        }else{
          console.log(result)
          return enums.success;
        }
        
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  Inner.groupSms = async () =>{
    try {
      
    } catch (error) {
      
    }
  }

  
  Inner.remoteMethod('registerCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

}