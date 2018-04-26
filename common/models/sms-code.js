'use strict';

module.exports = function(SmsCode) {


  SmsCode.greet = function(msgId, cb) {
    // var jm = JSON.stringify(msgId)
    var smsObject = {}
    smsObject.phone ='18651833910',
    smsObject.smscode = '662403'
    
    SmsCode.create(smsObject,function(err,smsTemplateIns){
      smsTemplateIns.phone = '18651833910'
      smsTemplateIns.smscode= '1234'
      smsTemplateIns.status = '2'
      smsTemplateIns.save(function(err,smsInsNew){
        cb(null,  smsInsNew);
      })
    })
    console.log(msgId)
    // console.log(jm)
    
  }

  SmsCode.remoteMethod('greet', {
        accepts: {arg: 'msgId', type: 'string'},

        returns: {arg: 'greeting', type: 'object'}
  });

};


