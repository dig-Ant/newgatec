'use strict'

module.exports = {
  smsmToLog: ()=>{
    module.exports = (SmsLog)=> {
    return new Promise((resolve,reject)=>{

      var smsObject = {}
    smsObject.phone ='18651833910',
    smsObject.smscode = '662403'
    
    SmsLog.create(smsObject,function(err,smsLogIns){
      smsLogIns.phone = '18651833910'
      smsLogIns.smscode= '1234'
      smsLogIns.msg = '您好！'
      smsLogIns.save(function(err,smsInsNew){
       if(!err){
          resolve(smsInsNew)
          console.log('成功')
       }else{
         reject(err)
         console.log('失败')
       }
      })
    })

    })
    
    }
  }
}