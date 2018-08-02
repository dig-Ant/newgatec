let jsonCheck = require('../../common/smsFn/jsonCheck');
let enums = require('../../common/core/enum');
let moment = require('moment');
moment.locale('zh-cn');

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
      console.log(obj);
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
      console.log('result===================>',result)
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
   
  }

  Inner.pay_smsCodeSend = async (obj,cb)=>{
    try {
      let input = {
      phone:obj.phone,
      type:1,
      sign:"675",
      modelId:"3839",
      content:"{code}",
      codeType:2
      }
      let jsonKeys = ['phone']
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj)
      let result = await Inner.app.models.Sms.smsCode(input);
      return result;
      console.log('result===================>',result)
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
   
  }
  Inner.smsCodeCheck = async (obj,cb)=>{
    
    try {
      console.log(obj);
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:1,
        status:0, 
        expirationTime:{gt: new Date()}
        }
        
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Inner.app.models.SmsCode.findOne({where:input});
        console.log(result);
        if(result==null){
          let err = new Error('验证码错误');
          err.statusCode = 412
          cb(err)
        }else{
          let smsUpdateStatus = await result.updateAttributes({status: 1 });
          console.log(enums.success);
          return enums.success;
        }
        
    } catch (error) {
      // enums.error.msg=error.message
     
      cb(error)
    }
  }

  Inner.pay_smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:2,
        status:0,
        expirationTime:{gt: new Date()}
        }
        
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Inner.app.models.SmsCode.findOne({where:input})
        if(result==null){
          let err = new Error('验证码错误');
          err.statusCode = 412
          cb(err)
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
          let err = new Error('验证码错误');
          err.statusCode = 412
          cb(err)
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

  Inner.pay_wechat_send= async(obj,cb) =>{
    try {
      let input = {
        openid:obj.openid,
        templateId:'-hJINiqp9NbgsTb1vb8QPJDvKtAErroM7SZRJ80ydRM',
        url:obj.url,
        data:{
          "first": {
            "value":"工资发放通知",
            "color":"#173177"
          },
          "keyword1":{
            "value":obj.clt_name,
            "color":"#173177"
          },
          "keyword2": {
            "value":obj.pay_time,
            "color":"#173177"
          },
          "keyword3": {
            "value":moment().format('LL'),
            "color":"#173177"
          },
          "remark":{
            "value":"感谢您的使用！",
            "color":"#173177"
          }
        }

      };
      let _send = Inner.app.models.WeChat_Log.wechat_send(input);
      return _send;
    } catch (error) {
      cb(error);
    }
  };

  Inner.pay_wechat_send_arry= async(obj,cb) =>{
    try {
      let input = {
        openid:null,
        templateId:'-hJINiqp9NbgsTb1vb8QPJDvKtAErroM7SZRJ80ydRM',
        url:obj.url,
        data:{
          "first": {
            "value":"工资发放通知",
            "color":"#173177"
          },
          "keyword1":{
            "value":obj.clt_name,
            "color":"#173177"
          },
          "keyword2": {
            "value":obj.pay_time,
            "color":"#173177"
          },
          "keyword3": {
            "value":moment().format('LL'),
            "color":"#173177"
          },
          "remark":{
            "value":"感谢您的使用！",
            "color":"#173177"
          }
        }

      };
      let opArr = obj.openids.split(',')
      let errArr = [];
      let sucArr = [];
      for (let i = 0; i < opArr.length; i++) {

        input.openid = opArr[i]
        try {
          let _send =  await Inner.app.models.WeChat_Log.wechat_send(input);
          sucArr.push(_send.msgid);
        } catch (error) {
          errArr.push(opArr[i])
        }
           
      }
      
      return {
        success:sucArr,
        error:errArr,
      };
    } catch (error) {
      cb(error);
    }
  };
  
  Inner.remoteMethod('registerCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('pay_smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('pay_smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('pay_wechat_send', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('pay_wechat_send_arry', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

}