let request = require('request');
let util = require('../util/util');
module.exports = {

  /**
   * 生成六位随机数
   * @method rangenum
   * @param {number} start 开始
   * @param {number} end 结束
   * @return {obj} promise
   **/
  rangenum: (start, end) => { //产生n位随机数

    var range = function (start, end) {
      var array = [];
      for (var i = start; i < end; ++i) array.push(i);
      return array;
    };
    var randomstr = range(start, end).map(function (x) {
      return Math.floor(Math.random() * 10);
    }).join('');
    console.log(randomstr);
    console.log(typeof randomstr);
    return randomstr;

  },
  returnMsg: (resStr, strArr) => {
    let msg = {
      txt: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
      strArr: [23465, 60]
    };


    let resString = resStr;
    for (let index = 0; index < strArr.length; index++) {

      resString = resString.replace('{' + (index + 1) + '}', strArr[index]);

    }
    return resString;

  },
  returnMsgCode: (resStr, code) => { //需要第一个值为modeltxt，第二个为随机验证码

    let resString = resStr.replace('{code}', code);


    return resString;

  },
   /**
   * 发送短信的api
   * @method smsSend
   * @param {string} sing 平台上申请的国际短信签名或者签名ID（须审核通过）
   * @param {string} templateId 平台上申请的国际短信模板Id（须审核通过）
   * @param {string} phone 手机号码
   * @param {string} content 短信填充内容
   * @return {obj} promise
   **/
  smsSend: (sign,templateId,phone,content) => {
    
    return new Promise(async (resolve, reject) => {
      let requestRes = util.promisify(request.bind(this));
      let tokenResult = await requestRes({
        method: 'POST',
        url: 'http://api.1cloudsp.com/api/v2/single_send',
        form: {
          accesskey: '7xKGcAJzQVkKL5y8',
          secret: 'XZwZ35rEp1tld1BPvBgePVCQtPHcJ3VA',
          sign: sign,
          templateId: templateId,
          mobile: phone,
          content: content
        }
      });
      if(tokenResult.body.code = '0'){
        resolve(tokenResult.body);
      }else{
        reject(tokenResult.body);
      }
    });
  },
    /**
   * 群发短信的api
   * @method groupSmsSend
   * @param {string} sing 平台上申请的国际短信签名或者签名ID（须审核通过）
   * @param {string} templateId 平台上申请的国际短信模板Id（须审核通过）
   * @param {string} phone 手机号码
   * @param {string} content 短信填充内容
   * @param {string} scheduleSendTime 短信定时发送时间，格式为：2016-01-01 18:00:00；参数如果为空表示立即发送
   * @return {obj} promise
   **/
  groupSmsSend:(sign,templateId,phones,content,scheduleSendTime)=>{
    return new Promise(async (resolve, reject)=>{
      let requestRes = util.promisify(request.bind(this));
      let tokenResult = await requestRes({
        method: 'POST',
        url: 'http://api.1cloudsp.com/api/v2/send',
        form: {
          accesskey: '7xKGcAJzQVkKL5y8',
          secret: 'XZwZ35rEp1tld1BPvBgePVCQtPHcJ3VA',
          sign: sign,
          templateId: templateId,
          mobile: phones,
          content: content,
          scheduleSendTime:scheduleSendTime
        }
      });
      if(tokenResult.body.code = '0'){
        resolve(tokenResult.body);
        console.log('成功');
      }else{
        console.log('失败');
        reject(tokenResult.body);
      }
    });
  },
   /**
   * 手机号码检测
   * @method phoneNumCheck
   * @param {string or Array} phones 手机号码字符串或者数组
   * @return {string or Array} 返回手机号码或者手机号码数组，取决于传入的值
   **/
  phoneNumCheck:(phones)=>{
    

    return new Promise(async (resolve, reject)=>{
      if(phones instanceof Array){
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
         
      }else{
        try {
          let phone = await phoneCheck(phones);
          resolve(phone);
        } catch (error) {
          reject(error);
        }
        
      }
    });
  }
};
phoneCheck=(phone)=>{
  return new Promise((resolve, reject)=>{
    if(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(phone)){
      resolve(phone);
    }else{
      let err = new Error(phone+' 手机号码格式不正确');
      err.statusCode = 412;
      reject(err);
    }
  });
};