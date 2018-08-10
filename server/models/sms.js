'use strict';
const enums = require('../../common/core/enum');
const jsonCkeck = require('../../common/smsFn/jsonCheck')
module.exports = function(Sms) {
let smsFn = require('../../common/smsFn/smsFn');

let msg = {
  tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
  stringArr: [23465, 60]
}

  Sms.greet = async function (obj, cb) {
    let result = 0
    if(obj.test == '1'){
      result = 1
    }
      return result;
    
  
    
  }
  /**
   * 存放短信模版
   * @param {string} model 模版内容
   * @param {string} modelType 模版类型
   * @param {number} length 模版除了验证码之外需要的字符串数组的长度
   * @returns {object} result 返回数据库插入条目的对象
   */
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

/**
 * 发送单条短信验证码
 * 模型示例
 * {
  "phone":"18651833910",
  "type":1,//是否需要生成随机验证码
  "sign":"675",//平台上申请的接口短信签名或者签名ID（须审核通过）
  "modelId":"3839",//平台上申请的接口短信模板Id（须审核通过）
  "content":"{code}",//发送的短信内容是模板变量内容，多个变量中间用##或者$$隔开，采用utf8编码需要随机数验证码时请用'{code}'替代
  "codeType":1//验证码应用的领域，如修改密码，修改微信账号
  }
 * 
 * @param {object} obj 传入的json对象 
 * @param {function} cb 回调
 */
  Sms.smsCode = async (obj,cb) => {
    return new Promise(async (resolve, reject) => {
    
   
      if (obj.type == 1) {
        try {
          let jsonKeys = ['phone','type','sign','modelId','content','codeType']
    
          let objCheck = await jsonCkeck.keysCheck(jsonKeys,obj)
          var promise = await smsFn.phoneNumCheck(obj.phone)
          // let modelsObj = await Sms.app.models.SmsModel.find_id(obj.modelId)
          // console.log(modelsObj)
          let testNum = smsFn.rangenum(enums.rangenum.start, enums.rangenum.end);//获取随机数

          let codeMsg = smsFn.returnMsgCode(obj.content, testNum); //插入验证码；
          // let smsMsg = smsFn.returnMsg(codeMsg,obj.strArr);//插入必填字段生成提示语；
        
          let smsSend = await smsFn.smsSend(obj.sign, obj.modelId, obj.phone, codeMsg)
          let modelCode = await Sms.app.models.SmsCode.createCode(obj.phone, testNum, obj.codeType||1);//写入smscode数据库
          console.log('=====>',modelCode)
          enums.smsLogObj.phone = obj.phone
          enums.smsLogObj.smsCode = modelCode.smsCode;
          enums.smsLogObj.smsMsg = codeMsg;
          enums.smsLogObj.smsModelId = obj.modelId;
          enums.smsLogObj.smsCodeId = modelCode.id;
          enums.smsLogObj.smsSign = obj.sign;

          let modelLog = await Sms.app.models.SmsLog.createLog(enums.smsLogObj)//写入日志
          // console.log(modelLog)
          let success = { code:1};
          success.msg = '验证码已发送';
          let successSend = JSON.parse(smsSend)
          success.data = {
            smUuid:successSend.smUuid
          }
          
          // cb(null,enums.success)
          // console.log(enums.success)
          resolve(success)
        } catch (error) {
          let err = new Error('验证码发送失败');
          err.statusCode = 412
          reject(err)
        }

      } else if (obj.type == 2) {
        // let err = new Error('暂不支持此类型');
        //   err.statusCode = 412
        //   reject(err)
        try {
          let jsonKeys = ['phone','type','sign','modelId','content']
          let objCheck = await jsonCkeck.keysCheck(jsonKeys,obj)
          var promise = await smsFn.phoneNumCheck(obj.phone)
          let smsSend = await smsFn.smsSend(obj.sign, obj.modelId, obj.phone, obj.content);
          enums.smsLogObj.phone = obj.phone;
          enums.smsLogObj.smsMsg = obj.content;
          enums.smsLogObj.smsSign = obj.sign;

          let modelLog = await Sms.app.models.SmsLog.createLog(enums.smsLogObj)//写入日志
          let success = { code:1};
          success.msg = '验证码已发送';
          let successSend = JSON.parse(smsSend)
          success.data = {
            smUuid:successSend.smUuid
          }
          
          resolve(success)
        } catch (error) {
          console.log(error);
          let err = new Error('验证码发送失败');
          err.statusCode = 412
          reject(err)
        }
        

      } else {
        
        let err = new Error('暂不支持此类型');
          err.statusCode = 412
          reject(err)
      }
   
  })
   
  }
  /**
   * 短信群发
   * 模型示例
   * {
  "phones":["18651833910","1751254391"], //电话号码的数组
  "sign":"675", //平台上申请的接口短信签名或者签名ID（须审核通过）
  "modelId":"767", //平台上申请的接口短信模板Id（须审核通过）
  "content":"", //发送的短信内容是模板变量内容，多个变量中间用##或者$$隔开，采用utf8编码
  "time":"2108-05-03 10-10-00" //短信定时发送时间，格式为：2016-01-01 18:00:00；参数如果为空表示立即发送
  }
   * @param {object} obj 传入的参数 
   * @param {function} cb 回调的参数
   */
  Sms.groupSms = async (obj,cb) => {
    return new Promise(async (resolve, reject) => {
    let jsonKeys = ['phones','sign','modelId']
    let promiseArr = [];
    try {
      let objCheck = await jsonCkeck.keysCheck(jsonKeys,obj)
      var promise = await smsFn.phoneNumCheck(obj.phones)
      
      let phoneArr = promise.join(',')
      // return phoneArr;
      console.log(obj)
      let groupSmsSend = await smsFn.groupSmsSend(obj.sign, obj.modelId, phoneArr, obj.content, obj.time)
      console.log(groupSmsSend)
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
          let success = {code:1}
          success.msg='发送成功'
          success.data = {
            batchId:successSend.batchId
          }
          // return enums.success;
          
          resolve(success)
        }).catch((error) => {
          error.statusCode = 500
          error.message = '数据库写入失败，但短信发送成功';
          
          // return enums.error
          reject(error)
        })
      } else {
        let err = new Error('短信发送失败');
        err.statusCode = 412
        reject(err)
      }
    } catch (error) {
      
      error.statusCode = 412
      reject(error);
    }
    
      
  })
    // }).catch((error) => {
    //   console.log(error)
    //   enums.error.message='手机号码格式不正确'
    //   cb(null,enums.error)
    //   // console.log(error)
    // })

  }
  /**
   * 短信验证码确认
   * 模型示例
   * {
  "phone":"18651833910",//手机号码
  "code":"844047",//验证码
  "codeType":1 // 验证码用途类型
  }
   * 
   * @param {object} obj 
   */
  Sms.checkCode = async (obj, cb) => {
    console.log('开始',enums.success)
    return new Promise(async (resolve, reject) => {


      // console.log(obj)
      
      try {
        let jsonKeys = ['phone', 'code', 'codeType'];
        let objCheck = await jsonCkeck.keysCheck(jsonKeys, obj);
        var promise = await smsFn.phoneNumCheck(obj.phone)
        let input = {
          phone:obj.phone,
          smsCode:obj.code,
          codeType:obj.codeType,
          expirationTime:{gt:new Date()},
          status:0
        };

        let smsCodeObj = await Sms.app.models.SmsCode.findOne({ where: input });
        console.log('smsCodeObj', smsCodeObj);
        
        if(smsCodeObj==null){
          let err = new Error('验证码错误');
          err.statusCode = 412
          cb(err)
        }else{
          let smsUpdateStatus = await smsCodeObj.updateAttributes({status: 1 });
          let success = {
          code: 1
          };
          success.msg = '验证码正确'
          console.log(success)
          resolve(success)
        }

      //   let smsUpdateStatus = await Sms.app.models.SmsCode.updateAll(enums.smsCodeCheck, { status: 1 })
        
        




       
      } catch (error) {

        console.log(error);
        reject(error)
      }
    })

  }

  Sms.remoteMethod('greet', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'result', type: 'object'}
  });
  Sms.remoteMethod('saveModel', {
    accepts: [{arg: 'model', type: 'string'},{arg: 'modelType', type: 'string'},{arg: 'length', type: 'number'}],

    returns: {arg: 'result', type: 'object'}
});
  // Sms.remoteMethod('smsCode', {
  // accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

  // returns: {arg: 'result', type: 'object'}
  // });
  // Sms.remoteMethod('checkCode', {
  //   accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

  //   returns: { arg: 'result', type: 'object' }
  // });

  // Sms.remoteMethod('groupSms', {
  //   accepts: [{ arg: 'obj', type: 'object', http: { source: 'body' } }],

  //   returns: { arg: 'result', type: 'object' }
  // });
};


