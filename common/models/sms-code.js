'use strict';
 
module.exports = function(SmsCode) {
let smsFn = require('../core/smsFn')
let smsSql = require('../core/smsSql') 
let msg = {
  tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
  stringArr: [23465, 60]
}

  SmsCode.greet = async function (msgId, cb) {
    // var jm = JSON.stringify(msgId)
    // var smsObject = {}
    // smsObject.phone ='18651833910',
    // smsObject.smscode = '662403'
    
    // SmsCode.create(smsObject,function(err,smsTemplateIns){
    //   smsTemplateIns.phone = '18651833910'
    //   smsTemplateIns.smscode= '1234'
    //   smsTemplateIns.status = '2'
    //   smsTemplateIns.save(function(err,smsInsNew){
    //     cb(null,  smsInsNew);
    //   })
    // })
      let num = await SmsCode.app.models.SmsLog.createLog().then((result)=>{
          console.log(result)
      }).catch((e)=>{
          console.log(e)
      })
      // console.log(msgId)
      // console.log(num)
 
    
    
    console.log(msgId)
    // console.log(jm)
    
  }

  SmsCode.remoteMethod('greet', {
        accepts: {arg: 'msgId', type: 'string'},

        returns: {arg: 'greeting', type: 'object'}
  });

};


