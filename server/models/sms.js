'use strict';
const enums = require('../../common/core/enum');
module.exports = function(Sms) {
let smsFn = require('../../common/core/smsFn');

let msg = {
  tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
  stringArr: [23465, 60]
}

  Sms.greet = async function (obj, cb) {
  
    
    
  
    
  }
  Sms.saveModel = async (model,modelType,length) =>{
      let modelObj = {
        txt:model,
        smsType:modelType,
        smsLength:length
        
      }
      enums.smsModel.id = modelType;

      // enums.smsModel.strArr = ['吕翱','1132132','456789']
      // console.log(model,modelType)
    let result = await Sms.app.models.SmsModel.create_Model(modelObj);
      // let result = await Sms.app.models.SmsModel.find_id(7);
      
    return result;
    // console.log(result)



  }
  Sms.smsModel = async (id) =>{
    
    let result = await Sms.app.models.SmsModel.find_id(id)
    
    return result;
    // console.log(result)



  }
  // Sms.remoteMethod('smsModel', {
  //       accepts: {arg: 'modelId', type: 'number'},

  //       returns: {arg: 'result', type: 'object'}
  // });
  Sms.smsCode = async (obj,cb) => {
    
    try {
       var promise = await smsFn.phoneNumCheck(obj.phone)
   
      if (obj.type == 1) {
        // let modelsObj = await Sms.app.models.SmsModel.find_id(obj.modelId)
        // console.log(modelsObj)
        let testNum = smsFn.rangenum(enums.rangenum.start, enums.rangenum.end);//获取随机数

        let codeMsg = smsFn.returnMsgCode(obj.content, testNum); //插入验证码；
        // let smsMsg = smsFn.returnMsg(codeMsg,obj.strArr);//插入必填字段生成提示语；
        try {
          let smsSend = await smsFn.smsSend(obj.sign, obj.modelId, obj.phone, codeMsg)
          let modelCode = await Sms.app.models.SmsCode.createCode(obj.phone, testNum, obj.codeType);//写入smscode数据库
          console.log(modelCode)
          enums.smsLogObj.phone = obj.phone
          enums.smsLogObj.smsCode = modelCode.smsCode;
          enums.smsLogObj.smsMsg = codeMsg;
          enums.smsLogObj.smsModelId = obj.modelId;
          enums.smsLogObj.smsCodeId = modelCode.id;
          enums.smsLogObj.smsSign = obj.sign;

          let modelLog = await Sms.app.models.SmsLog.createLog(enums.smsLogObj)//写入日志
          // console.log(modelLog)
          enums.success.msg = '验证码已发送';
          let successSend = JSON.parse(smsSend)
          enums.success.data = {
            smUuid:successSend.smUuid
          }
          
          // cb(null,enums.success)
          // console.log(enums.success)
          return enums.success;
        } catch (error) {
          enums.error.msg = '验证码发送失败';
          console.log(error)
          return enums.error;
        }

      } else if (obj.type == 2) {
        enums.error.msg = '暂不支持此类型';
        return enums.error;
      } else {
        enums.error.msg = '暂不支持此类型';
        return enums.error;
      }
    } catch (error) {
      console.log(error)
      enums.error.msg = '手机号码格式不正确'
      return enums.error;
      
    }

   
  }
  Sms.groupSms = async (obj,cb) => {
    let promiseArr = [];
    try {
      var promise = await smsFn.phoneNumCheck(obj.phones)
      
      let phoneArr = obj.phones.join(',')
      // return phoneArr;
      let groupSmsSend = await smsFn.groupSmsSend(obj.sign, obj.modelId, phoneArr, obj.content, obj.time)

      if (JSON.parse(groupSmsSend).code == '0') {


        for (let index = 0; index < obj.phones.length; index++) {
          enums.smsLogObj.phone = obj.phones[index];
          enums.smsLogObj.smsMsg = obj.content;
          enums.smsLogObj.smsModelId = obj.modelId;
          enums.smsLogObj.smsSign = obj.sign;

          promiseArr.push(Sms.app.models.SmsLog.createLog(enums.smsLogObj))


        }
        
        await Promise.all(promiseArr).then((result) => {
          console.log(result)
          let successSend = JSON.parse(groupSmsSend)
          console.log(successSend)
          enums.success.msg='发送成功'
          enums.success.data = {
            batchId:successSend.batchId
          }
          // return enums.success;
          cb(null,enums.success);
        }).catch((error) => {
          enums.error.msg = '数据库写入失败，但短信发送成功';
          enums.error.data = error;
          // return enums.error
          cb(null,enums.error)
        })
      } else {
        enums.error.msg = '短信发送失败'
        enums.error.data = groupSmsSend;
        return enums.error;
        // cb(null,enums.error);
      }
    } catch (error) {
      console.log(error)
      enums.error.msg='手机号码格式不正确'
      return enums.error;
    }
    
      
    
    // }).catch((error) => {
    //   console.log(error)
    //   enums.error.msg='手机号码格式不正确'
    //   cb(null,enums.error)
    //   // console.log(error)
    // })





  }
  Sms.checkCode = async (obj)=>{
    
    // console.log(obj)
    try {
      var promise = await smsFn.phoneNumCheck(obj.phone)
      enums.smsCodeCheck.phone = obj.phone;
      enums.smsCodeCheck.smsCode = obj.code;
      enums.smsCodeCheck.codeType = obj.codeType;
      let smsCodeObj = await Sms.app.models.SmsCode.smsModel(enums.smsCodeCheck);
      // console.log(smsCodeObj[smsCodeObj.length-1].expirationTime )
      if (smsCodeObj.length > 0) {
        if (parseInt(new Date().getTime()) < parseInt(smsCodeObj[smsCodeObj.length - 1].expirationTime)) {
          let smsUpdateStatus = await Sms.app.models.SmsCode.updateAll(enums.smsCodeCheck, { status: 1 })
          enums.success.msg = '验证码正确'
          return enums.success;
        } else {
          enums.success.msg = '验证码过期'
          return enums.success;
        }



        let smsCodeModel = await Sms.app.models.SmsCode.smsStatus(smsCodeObj[smsCodeObj.length - 1].id)

        console.log(smsCodeModel)
      } else {
        enums.success.msg = '验证码错误'
        return '验证码错误'
      }
    } catch (error) {
      enums.error.msg='手机号码格式不正确'
      return enums.error;
    }
    
    
  }

  Sms.remoteMethod('greet', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'result', type: 'object'}
  });
  Sms.remoteMethod('saveModel', {
    accepts: [{arg: 'model', type: 'string'},{arg: 'modelType', type: 'string'},{arg: 'length', type: 'number'}],

    returns: {arg: 'result', type: 'object'}
});
  Sms.remoteMethod('smsCode', {
  accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

  returns: {arg: 'result', type: 'object'}
  });
  Sms.remoteMethod('checkCode', {
    accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

    returns: { arg: 'result', type: 'object' }
  });

  Sms.remoteMethod('groupSms', {
    accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

    returns: { arg: 'result', type: 'object' }
  });
};


