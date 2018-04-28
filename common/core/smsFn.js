module.exports = {

  /**
   * 生成六位随机数
   * @method rangenum
   * @param {number} start 开始
   * @param {number} end 结束
   * @return {obj} promise
   **/
  rangenum: (start, end) => { //产生n位随机数
    return new Promise((resolve, reject) => {
      var range = function (start, end) {
        var array = [];
        for (var i = start; i < end; ++i) array.push(i);
        return array;
      };
      var randomstr = range(start, end).map(function (x) {
        return Math.floor(Math.random() * 10);
      }).join('');
      resolve(randomstr)
    })
  },
  returnMsg: (msgModel) => {
    let msg = {
      tstString: '您的验证码为{1}，请于{2}秒内正确输入，如非本人操作，请忽略此短信。',
      stringArr: [23465, 60]
    }

    return new Promise((resolve, reject) => {
      let resString = msgModel.tstString
      for (let index = 0; index < msgModel.stringArr.length; index++) {
        
        resString = resString.replace('{' + (index+1) + '}', msgModel.stringArr[index])
        
      }
      resolve(resString)
    })
  }
}