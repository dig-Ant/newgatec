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
      console.log(randomstr)
      console.log(typeof randomstr)
     return randomstr;
   
  },
  returnMsg: (resStr,strArr) => {
    let msg = {
      txt: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
      strArr: [23465, 60]
    }

    
      let resString = resStr
      for (let index = 0; index < strArr.length; index++) {

        resString = resString.replace('{' + (index + 1) + '}', strArr[index])

      }
      return resString;
    
  },
  returnMsgCode: (resStr,code) => {//需要第一个值为modeltxt，第二个为随机验证码
    

    
     

      let  resString = resStr.replace('{code}',code)

      
      return resString;
    
  },
  addDatetime: (second) => {
    return new Promise((resolve) => {
      var a = new Date(dd)
      a = a.valueOf()
      a = a + second * 1000 * 60
      a = new Date(a)
      resolve(a)
    })

  }
}