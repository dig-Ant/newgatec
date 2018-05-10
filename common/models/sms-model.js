module.exports = function (SmsModel) {
let smsFn = require('../smsFn/smsFn')
  /**
   * @method 模版储存
   * @param {object} 传入对象
   * @returns {object} 返回值
   */

  SmsModel.create_Model =  (smsObject) => {
    return new Promise( async (resolve, reject) => {
      
      try {
        let result =  await SmsModel.create(smsObject)
       
        resolve(result)
      } catch (error) {
        reject(error)
        console.log(error)
      }
      
         
     
    })
  }

  SmsModel.find_id = (smsModelId)=>{
    return new Promise( async (resolve, reject) => {
      
      try {
        let result =  await SmsModel.findById(smsModelId)
        // let modelStr = await smsFn.returnMsg() 
          console.log(result)
        resolve(result)
      } catch (error) {
        reject(error)
      }
      
         
     
    })
  }
 
}