module.exports = function (SmsLog) {

  /**
   * @method 日志存贮
   * @param {object} 传入对象
   * @returns {object} 返回值
   */

  SmsLog.createLog =  (smsObject) => {
    return new Promise( async (resolve, reject) => {
      
      try {
        let crea =  await SmsLog.create(smsObject);
       
        resolve(crea);
      } catch (error) {
        reject(error);
      }
      
         
     
    });
  };
  SmsLog.findCode = (smsModelId)=>{
    return new Promise( async (resolve, reject) => {
      
      try {
        let result =  await SmsLog.findById(smsModelId);
       
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
         
     
    });
  };
};