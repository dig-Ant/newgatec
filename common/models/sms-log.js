module.exports = function (SmsLog) {
  SmsLog.createLog = () => {
    return new Promise((resolve, reject) => {
      // var jm = JSON.stringify(msgId)
      var smsObject = {}
      smsObject.phone = '18651833910',
        smsObject.SmsCode = '662403'

      SmsLog.create(smsObject).then((result)=>{
        resolve(result)
      }).catch((e)=>{
        console.log(e)
      })
    })
  }
}