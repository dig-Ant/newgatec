'use strict';
const enums = require('../../common/core/enum');
module.exports = function(Sms) {
let smsFn = require('../../common/core/smsFn');

let msg = {
  tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
  stringArr: [23465, 60]
}

  Sms.greet = async function (msgId, cb) {
  
    var smsObject = {}
      smsObject.phone = '18651833910';
       
          let testNum = smsFn.rangenum(enums.rangenum.start,enums.rangenum.end)

          smsObject.smsCode = testNum;
      let num = await Sms.app.models.SmsLog.createLog(smsObject)
 
      return num;
    
  
    
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
  Sms.smsCode = async (obj)=>{
    
    if(obj.type == 1){
    let modelsObj = await Sms.app.models.SmsModel.find_id(obj.modelId)
    // console.log(modelsObj)
    let testNum = smsFn.rangenum(enums.rangenum.start,enums.rangenum.end);//获取随机数

      let codeMsg = smsFn.returnMsgCode(modelsObj.txt,testNum); //插入验证码；
      let smsMsg = smsFn.returnMsg(codeMsg,obj.strArr);//插入必填字段生成提示语；
      
      let modelCode = await Sms.app.models.SmsCode.createCode(obj.phone,testNum,obj.codeType);//写入smscode数据库
        console.log(modelCode)
        enums.smsLogObj.phone = obj.phone
        enums.smsLogObj.smsCode = modelCode.smsCode;
        enums.smsLogObj.smsMsg = smsMsg;
        enums.smsLogObj.smsModelId = obj.modelId;
        enums.smsLogObj.smsCodeId = modelCode.id;
        
      let modelLog = await Sms.app.models.SmsLog.createLog(enums.smsLogObj)//写入日志
      console.log(modelLog)
      enums.success.msg = '验证码已发送';
      enums.success.data = {smsCode:modelCode.smsCode}
      return enums.success ;
    }else if(obj.type == 2){
      return '暂不支持此类型'
    }else{
      return '暂不支持此类型'
    }
  }
  Sms.checkCode = async (obj)=>{
    
    console.log(obj)
    enums.smsCodeCheck.phone = obj.phone;
    enums.smsCodeCheck.smsCode = obj.code;
    enums.smsCodeCheck.codeType = obj.codeType;
    let smsCodeObj = await Sms.app.models.SmsCode.smsModel(enums.smsCodeCheck);
    // console.log(smsCodeObj[smsCodeObj.length-1].expirationTime )
    if (smsCodeObj.length>0){
      if(parseInt(new Date().getTime())<parseInt(smsCodeObj[smsCodeObj.length-1].expirationTime)){
        let smsUpdateStatus = await Sms.app.models.SmsCode.updateAll(enums.smsCodeCheck,{status:1})
        enums.success.msg = '验证码正确'
        return enums.success;
        }else{
          enums.success.msg = '验证码过期'
          return enums.success;
        }  
        
        
    
        let smsCodeModel = await Sms.app.models.SmsCode.smsStatus(smsCodeObj[smsCodeObj.length-1].id)
        
        console.log(smsCodeModel)
    }else{
      enums.success.msg = '验证码错误'
      return '验证码错误'
    }
    
  }

  Sms.remoteMethod('greet', {
        accepts: {arg: 'msgId', type: 'string'},

        returns: {arg: 'id', type: 'object'}
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
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],
  
    returns: {arg: 'result', type: 'object'}
    });
  

};


