
let assert = require('assert');
var rp = require('request-promise');
let enums = require('./enum');
module.exports = {

   /**
   * 手机号码检测
   * @method phoneNumCheck
   * @param {string or Array} phones 手机号码字符串或者数组
   * @return {string or Array} 返回手机号码或者手机号码数组，取决于传入的值
   **/

  phoneNumCheck: (phones)=>{
    return new Promise(async (resolve, reject)=>{
      if (phones instanceof Array) {
        let promiseArr = [];
        for (let index = 0; index < phones.length; index++) {
          promiseArr.push(phoneCheck(phones[index]));
        }
        try {
          let phoneArr =  await Promise.all(promiseArr);
          resolve(phoneArr);
        } catch (error) {
          reject(error);
          console.log(error);
        }
      } else {
        try {
          let phone = await phoneCheck(phones);
          resolve(phone);
        } catch (error) {
          reject(error);
        }
      }
    });
  },
  keysCheck: (arr, obj)=>{
    return new Promise(async (resolve, reject) => {
      let promiseArr = [];
      for (let index = 0; index < arr.length; index++) {
        promiseArr.push(keyCheck(arr[index], obj));
      }
      Promise.all(promiseArr).then((result)=>{
        resolve(true);
      }).catch((e)=>{
        reject(e);
      });
    });
  },
  passWordCheck: (pass)=>{
    return new Promise((resolve, reject)=>{
      if (/^\d{6}$/.test(pass)) {
        resolve(pass);
      } else {
        let err = new Error('密码格式不正确，密码由6位数字组成');
        err.statusCode = 412;
        err.status = 412;
        reject(err);
        
      }
    });
  },
  /**
   *
   * 属性依赖检测
   * @method interdependentCheck
   * @param {string} key1 依赖于key2，如果key1存在，key2必须存在，key1不存在也为成功
   * @param {string} key2 key1的依赖项
   * @param {object} obj 包含两者的对象
   */
  interdependentCheck: (key1, key2, obj)=>{
    return new Promise(async (resolve, reject)=>{
      let key1_check =  keyCheck(key1, obj).then(async (result)=>{
        try {
          let key2_check = await keyCheck(key2, obj);
          resolve('ok');
        } catch (error) {
          let err = new Error('当属性' + key1 + '存在的时候，属性' + key2 + '必须存在');
          err.statusCode = 412;
          err.status = 412;
          reject(err);
        }
      }).catch((e)=>{
        resolve('ok');
      });
    });
  },
  inner_Check:(obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        let _ckeck = await keyCheck('body',obj);
        resolve('ok');
      } catch (error) {
        let err = new Error('用户不存在');
        err.statusCode = 412;
        err.status = 412;
        reject(err);
      }
    });
  }

};
phoneCheck = (phone)=>{
  return new Promise((resolve, reject)=>{
    if (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(phone)) {
      resolve(phone);
    } else {
      let err = new Error(phone + ' 手机号码格式不正确');
      err.statusCode = 412;
      err.status = 412;
      reject(err);
    }
  });
};

keyCheck = (key, obj)=>{
  return new Promise((resolve, reject)=>{
    if (obj.hasOwnProperty(key)) {
      
      if(obj[key]==null||/^\s+|\s+$/g.test(obj[key])){
        let err = new Error('值不能为空或首尾不能有空格');
        err.statusCode = 412;
        err.status = 412;
        reject(err);
      }else{
        resolve(1);
      }
      
    } else {
      let err = new Error(key + '不能为空');
      err.statusCode = 412;
      err.status = 412;
      reject(err);
    }
  });
};

