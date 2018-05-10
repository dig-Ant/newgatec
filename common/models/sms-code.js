'use strict';
 
module.exports = function(SmsCode) {
let smsFn = require('../smsFn/smsFn')

let msg = {
  tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
  stringArr: [23465, 60]
}

  SmsCode.createCode = async function (phone,codeNum,codeType) {
  
    var smsObject = {}
      smsObject.phone = phone;
        smsObject.smsCode = codeNum;
        smsObject.status = 0;
        smsObject.codeType = codeType;
        smsObject.expirationTime =  new Date().getTime()+6000000 
        
      let num = await SmsCode.create(smsObject)
 
      return num;
    
  
    
  }
  SmsCode.smsModel = async (modelObj) =>{
    return new Promise( async (resolve, reject) => {
      let checkCode = {where: modelObj}
      try {
        let result = await SmsCode.find(checkCode)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    
      
    // console.log(result)
    
    });


  }
  SmsCode.smsStatus = async (modelObj,upObj) =>{
    return new Promise( async (resolve, reject) => {
      let checkCode = {where: modelObj}
      try {
        let result = await SmsCode.updateAll(modelObj,upObj)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    
      
    // console.log(result)
    
    });
    

  }

  SmsCode.remoteMethod('smsModel', {
        accepts: [{arg: 'modelId', type: 'string'},{arg: 'codeNum', type: 'string'}],

        returns: {arg: 'result', type: 'object'}
  });

  // SmsCode.remoteMethod('greet', {
  //       accepts: [{arg: 'modelId', type: 'string'},{arg: 'codeNum', type: 'string'}],

  //       returns: {arg: 'id', type: 'object'}
  // });

};


