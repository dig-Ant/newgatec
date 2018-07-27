'use strict';
import moment from 'moment';

let util = {
  /**
   * 用于侦测数据类型的函数库
   * @class _detection
   */
  _detection: {
    /**
     * 是否是空对象{}
     * @method isEmptyObj
     * @param {any} obj 待检查的内容
     * @return {boolean} 是否为{}
     **/
    isEmptyObj: function (obj) {
      for (let t in obj)
        return false;
      return true;
    },
    /**
     * 检查指定参数是否是Null
     * @method isNull
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为Null
     **/
    isNull: function (obj) {
      return (!obj && typeof (obj) !== "undefined" && obj !== 0);
    },
    /**
     * 检查指定参数是否是undefined
     * @method isUndefined
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为String
     **/
    isUndefined: function (obj) {
      return (typeof obj === 'undefined');
    },
    /**
     * 检查指定参数是否是Function
     * @method isFunction
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为Function
     **/
    isFunction: function (obj) {
      return (typeof obj === 'function');
    },
    /**
     * 是否为异步(async)的function
     * @method isAsyncFunction
     * @param {function} obj 待检查的内容
     * @return {boolean} 是否为异步(async)的function
     **/
    isAsyncFunction: function (obj) {
      return (Object.prototype.toString.call(obj) === "[object AsyncFunction]");
    },
    /**
     * 检查指定参数是否是Object
     * @method isObject
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为object
     **/
    isObject: function (obj) {
      return (typeof obj === 'object');
    },
    /**
     * 检查指定参数是否是String
     * @method isString
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为String
     **/
    isString: function (obj) {
      return (typeof obj === 'string');
    },
    /**
     * 检查指定参数是否是Array
     * @method isArray
     * @param {anything} obj 待检查的内容
     * @return {boolean} 是否为Array
     **/
    isArray: function (obj) {
      return Array.isArray(obj);
    },
    /**
     * 检查指定参数是否有效，即非null，非undefined
     * @method isValid
     * @param {anything} input 待检查的内容
     * @return {boolean} 是否为有效
     **/
    isValid: function (input) {
      return !(input == null || typeof input === "undefined");
    },
    /**
     * 检查指定参数是否为有效字符串，即非空白字符串
     * @method isValidString
     * @param {anything} input 待检查的内容
     * @return {boolean} 是否为有效
     **/
    isValidString: function (input) {
      return typeof (input) === "string" && input.length > 0 && !input.match(/(^\s+$)/g);
    },
    /**
     * 检查指定参数是否是number
     * @method isNumber
     * @param {anything} input 待检查的内容
     * @return {boolean} 是否为Number
     **/
    isNumber: function (input) {
      return (typeof input === 'number');
    },
    /**
      * 是否是email
      * @method isEmail
      * @param {string} input 待检查的内容
      * @return {boolean} 是否为email
      **/
    isEmail: function (input) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(input);
    }
  },

  /**
   * 用于提供通用功能的函数库
   * @class _common
   */
  _common: {
    /**
     * 混合任意多个对象到一个对象中，后续同名的成员将覆盖前面的, 不检查原型链中包含的成员
     * @method mixin
     * @param {json} dest 第一个对象，后面可以添加任意多的参数进行融合
     * @param {boolean} noLog 是否显示覆盖的log，可选
     * @return {json} 融合后的对象
     **/
    mixin: function (dest, noLog) {
      var log = true;
      var start = 1;
      if (util._detection.isUndefined(dest)) {
        dest = {};
      }
      if (!util._detection.isObject(noLog)) {
        log = !!noLog;
        start = 2;
      }
      for (var i = start; i < arguments.length; i++) {
        var src = arguments[i]
        for (var key in src) {
          if (src.hasOwnProperty(key) && !util._detection.isUndefined(src[key])) { //hasownproperty 不追踪prototype chain
            if (log && dest[key]) {
              console.debug("[" + key + "] will be overwritten!");
            }
            dest[key] = src[key];
          }
        }
      }
      return dest;
    },
    /**
     * 字符串转换成json
     * @method toJson
     * @param {string} str json字符串
     * @return {json} json格式数据
     **/
    toJson: function (str) {
      if (str.substring(0, 1) !== "{" && str.substring(0, 1) !== "[") {
        str = "{" + str + "}";
      }
      try {
        return (new Function("return " + str))();
      } catch (e) {
        console.debug("fail to convert " + str + " to json");
        return {};
      }
    },
    /**
     * 获取随机整数，范围在[min, max]
     * @method rdm
     * @param {number} max 上限值，整数
     * @param {number} min 下限值，整数，默认为0
     * @return {number} 随机的整数
     **/
    rdm: function (max, min = 0) {
      if (max > min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return max;
    },
    /**
     * sleep毫秒
     * @method sleep
     * @param {number} ms 毫秒数
     **/
    sleep: async function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    /**
     * 生成guid
     * @method guid
     * @return {string} guid字符串
     **/
    guid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    /**
     * 对函数进行promise封装
     * @method promisify
     * @param {function} fn 待进行promise封装的函数
     * @param {Object} receiver 接收this的对象
     * @return {promise} promise的封装
     **/
    promisify: function (fn, receiver) {
      return (...args) => {
        return new Promise((resolve, reject) => {
          fn.apply(receiver, [...args, (err, res) => {
            return err ? reject(err) : resolve(res);
          }]);
        });
      };
    },
    /**
     * 对多个对象进行对比，看属性是否有重复
     * @method compareObjs
     * @param {array} objArray 待对比的对象
     **/
    compareObjs: function () {
      let props = [];
      for (let i = 0; i < arguments.length; i++) {
        let obj = arguments[i];
        for (let p in obj) {
          if (!props[p]) {
            props[p] = true;
          }
          else {
            console.log(`The property "${p}" in the arguments[${i}] is conflicted with previous argument(s)`);
          }
        }
      }
    }
  },

  /**
   * 用于处理时间日期相关的函数库
   * @class _date
   */
  _date: {
    /**
     * 时间字符串转化为date对象
     * @method getStrToDate
     * @return {Date} ticks
     **/
    getStrToDate: function (timeStr) {
      if (!timeStr) {
        return moment().toDate();
      }
      return moment(timeStr).toDate();
    },
    /**
     * 获取当前时间的ticks
     * @method getTicks
     * @return {number} ticks
     **/
    getDateToStr: function (date) {
      if (!date) {
        return moment().format().slice(0, 19).replace('T', ' ');
      }
      return moment(date).format().slice(0, 19).replace('T', ' ');
    },
    /**
     * 获取当前时间的ticks
     * @method getTicks
     * @return {number} ticks
     **/
    getTicks: function () {
      return new Date().getTime();
    },
    /**
     * 获取到期时间
     * @method getTtl
     * @param {number} duration 有效期的长度，单位：分钟
     * @return {number} 到期时间ticks
     **/
    getTtl: function (duration) {
      return util._date.getTicks() + duration * 1000 * 60;
    },
    /**
     * 检查是否已经失效
     * @method checkTtl
     * @param {number} ttl 待检查的ttl
     * @return {boolean} 是否失效
     **/
    checkTtl: function (ttl) {
      return util._date.getTicks() < ttl;
    },
  },

  /**
   * 用于处理字符串相关的函数库
   * @class _string
   */
  _string: {
    /**
     * 移除当前的字符串两端的空格
     * @method trim
     * @param {string} str 待处理的字符串
     * @return {string} 去除两端空格的字符串
     **/
    trim: function (str) {
      if (util._detection.isValidString(str)) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }
      return '';
    },
    /**
     * 移除当前的字符串两端的空格
     * @method numToString
     * @param {number} num 待处理的数字
     * @param {number} toFixed 保留几位小数 默认2
     * @return {string} 
     **/
    numToString: function (num, toFixed) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;//负浮点数
      if (regPos.test(num) || regNeg.test(num)) {
        // console.log(num);
        var result = '', counter = 0, dotted = '', nums = '';
        num = Number(num);
        num = (num || 0).toFixed(toFixed || 2);
        num = (num || 0).toString();
        if (num.indexOf('.') != -1) {
          nums = num.substring(0, num.indexOf('.'));
          dotted = num.substring(num.indexOf('.'));
        }
        for (var i = nums.length - 1; i >= 0; i--) {
          counter++;
          result = nums.charAt(i) + result;
          if (!(counter % 3) && i != 0) { result = ',' + result; }
        }
        result = result + dotted;
        return result;
      } else {
        return num;
      }

    }
  },

  /**
   * 用于处理数组相关的函数库
   * @class _array
   */
  _array: {
    /**
     * 将数组按长度编组
     * @method groupArray
     * @param {array} inputArray 待处理的数组
     * @param {length} length 每组数组的元素的个数
     * @return {array[]} 按照长度进行编组后的几个数组
     **/
    groupArray: function (inputArray, length) {
      var res = [];
      for (var i = 0; i < inputArray.length; i++) {
        if (i % length === 0) {
          var temp_modules = inputArray.slice(i, Math.min(i + length, inputArray.length));
          res.push(temp_modules);
        }
      }
    },
    /**
     * 将元素或数组添加到原数组
     * @method append
     * @param {array} currentMessages 当前的数组
     * @param {array or 元素} messages 每组数组的元素的个数
     * @param {boolean} pre 是否是放在原数组的开头位置，默认为true
     * @return {array} 更新后的数组
     **/
    append: function (currentMessages = [], messages, pre = true) {
      if (!Array.isArray(messages)) {
        messages = [messages];
      }
      return pre ? messages.concat(currentMessages) : currentMessages.concat(messages)
    },
  },


  /**
   * 与QueryString相关的函数和功能
   * @class _query_string
   */
  _queryString: {
    /**
     * 获取去除了QueryString的url
     * @method getUrlWithoutQS
     * @param {string} url 路径
     * @return {string} 去除了QueryString的url
     **/
    getUrlWithoutQS: function (url) {
      var pos = url.indexOf("?");
      return pos > 0 ? url.substr(0, pos) : url;
    },
    /**
     * 从指定的url中获取去QueryString字符串
     * @method getQSStrFromUrl
     * @param {string} url 路径
     * @return {string} url中的QueryString的字符串
     **/
    getQSStrFromUrl: function (url) {
      var pos = url.indexOf("?");
      return pos > 0 ? url.substr(pos + 1) : "";
    },
    /**
     * 将Json格式的QueryString的Json格式序列化成字符串
     * @method serializeQS
     * @param {json} qsJson 路径
     * @return {string} QueryString字符串
     **/
    serializeQS: function (qsJson) {
      var qsStr = "";
      for (let qs in qsJson) {
        qsStr += qs + "=" + qsJson[qs] + "&";
      }
      return qsStr.length > 0 ? qsStr.slice(0, -1) : "";
    },
    /**
     * 附加QueryString到指定的url，并覆盖已有同名的QS
     * @method combineQS
     * @param {string} url 路径
     * @param {json} qsJson json格式的QueryString
     * @return {string} 附加后的url
     **/
    combineQS: function (url, qsJson) {
      var oriQS = util._queryString.getQSJson(url);
      console.debug("mixin QS for url:" + url);
      var qs = util._common.mixin(oriQS, qsJson);
      var qsStr = util._queryString.serializeQS(qs);
      qsStr = qsStr.length ? ("?" + qsStr) : "";
      return util._queryString.getUrlWithoutQS(url) + qsStr;
    },
    /**
     * 在url中移除指定的QS，
     * @method removeQSFromUrl
     * @param {string} url 路径
     * @param {string} qsKeys 可为多个qs的key
     * @return {string} 移除指定qs后的url
     **/
    removeQSFromUrl: function (url, qsKeys) {
      var ori = util._queryString.getUrlWithoutQS(url);
      var qsJson = util._queryString.getQSJson(url);
      for (var i = 1; i < arguments.length; i++) {
        delete qsJson[arguments[i].toLowerCase()];
      }
      return util._queryString.combineQS(ori, qsJson);
    },
    /**
     * 获取QueryString的JSON数据
     * @method getQSJson
     * @param {string} url 路径,无效时从当前location中获取
     * @return {json} json格式的QueryString
     **/
    getQSJson: function (url) {
      url = url || window.location.href;
      let str = util._queryString.getQSStrFromUrl(url);
      var pairs = str.split('&');
      var result = {};
      pairs.forEach(function (pair) {
        pair = pair.split('=');
        var name = pair[0];
        var value = pair[1];
        if (name.length) {
          name = name.toLowerCase();
          if (result[name] !== undefined) {
            if (!result[name].push) { //重复的key变成数组保存起来
              result[name] = [result[name]];
            }
            result[name].push(value || '');
          } else {
            result[name] = value || '';
          }
        }
      });
      return result;
    },
    /**
     * 获取QueryString的JSON数据 除去hash
     * @method getQSJson
     * @param {string} url 路径,无效时从当前location中获取
     * @return {json} json格式的QueryString
     **/
    getQSJsonWithoutHash: function (url) {
      url = url || window.location.href;

      var pos = url.indexOf("#");
      url = pos > 0 ? url.substr(0, pos) : url;

      let str = util._queryString.getQSStrFromUrl(url);
      var pairs = str.split('&');
      var result = {};
      pairs.forEach(function (pair) {
        pair = pair.split('=');
        var name = pair[0];
        var value = pair[1];
        if (name.length) {
          name = name.toLowerCase();
          if (result[name] !== undefined) {
            if (!result[name].push) { //重复的key变成数组保存起来
              result[name] = [result[name]];
            }
            result[name].push(value || '');
          } else {
            result[name] = value || '';
          }
        }
      });
      return result;
    },
    /**
     * 移除微信分享所带的QS上额外的信息
     * @method removeWXUrlExtra
     * @param {string} url 待处理的url
     * @return {string} 处理后的url
     **/
    removeWXUrlExtra: function (url) {
      url = url.replace("#rd", "");
      return url;
    },
    /**
     * 拼接对象为请求字符串
     * @param {Object} obj - 待拼接的对象
     * @returns {string} - 拼接成的请求字符串
     */
    encodeSearchParams: function (obj) {
      const params = []

      Object.keys(obj).forEach((key) => {
        let value = obj[key]
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
      })

      return params.join('&')
    }

  },

  /**
   * 用于处理文件相关的函数库
   * @class _file
   */
  _file: {
    /**
     * 获取文件的扩展名
     * @method getFileExt
     * @param {string} fileName 文件名或文件全名
     * @return {string} 不含"."的扩展名
     **/
    getFileExt: function (fileName) {
      if (!util._detection.isValidString(fileName)) return;
      let index = fileName.lastIndexOf(".");
      if (index > 0 && index < fileName.length - 1) {
        return fileName.substr(index + 1);
      }
    },
    /**
     * 从文件全名中获取文件名
     * @method getFileName
     * @param {string} fullName 文件全名
     * @return {string} 文件名
     **/
    getFileName: function (fullName) {
      if (!util._detection.isValidString(fullName)) return;
      let res = fullName;
      let index = res.lastIndexOf("/");
      if (index > -1 && index < res.length - 1) {
        res = res.substr(index + 1);
      }
      index = res.lastIndexOf("\\");
      if (index > -1 && index < res.length - 1) {
        res = res.substr(index + 1);
      }
      return res;
    },
    /**
     * 获取格式化后的文件大小显示字符串
     * @method getFormattedFileSize
     * @param {number} bytes 文件大小
     * @return {string} 文件大小的格式化显示字符串
     **/
    getFormattedFileSize: function (fileSize) {
      const fileSizes = [
        ['TB', 1024 * 1024 * 1024 * 1024],
        ['GB', 1024 * 1024 * 1024],
        ['MB', 1024 * 1024],
        ['KB', 1024]
      ];
      const size = fileSizes.find((unitAndMinBytes) => {
        const minBytes = unitAndMinBytes[1];
        return fileSize > minBytes;
      });
      if (size) {
        return `${Math.floor(fileSize / size[1])} ${size[0]}`;
      }
      return `${fileSize} B`;
    },
  },

  /**
   * 用于判断是否是微信浏览器
   * @class isWxBrower
   */
  _isWx: {
    isWxBrower: function () {
      let ua = window.navigator.userAgent.toLowerCase();
      let isWeixin = ua.indexOf('micromessenger') !== -1;
      if (isWeixin) {
        return true;
      } else {
        return false;
      }
    }
  },
  _storage: {
    get: function (key) {
      var value = window.localStorage.getItem(key);
      if (value) {
        try {
          var value_json = JSON.parse(value);
          if (typeof value_json === 'object') {
            return value_json;
          } else if (typeof value_json === 'number') {
            return value_json;
          }
        } catch (e) {
          return value;
        }
      } else {
        return false;
      }
    },
    set: function (key, value) {
      window.localStorage.setItem(key, value);
    },
    remove: function (key) {
      localStorage.removeItem(key);
    },
    clear: function () {
      localStorage.clear();
    },
    get_s: function (key) {
      var value = window.sessionStorage.getItem(key);
      if (value) {
        try {
          var value_json = JSON.parse(value);
          if (typeof value_json === 'object') {
            return value_json;
          } else if (typeof value_json === 'number') {
            return value_json;
          }
        } catch (e) {
          return value;
        }
      } else {
        return false;
      }
    },
    set_s: function (key, value) {
      window.sessionStorage.setItem(key, value);
    },
    remove_s: function (key) {
      
      window.sessionStorage.removeItem(key);
    },
    clear_s: function () {
      window.sessionStorage.clear();
    },
  }


}

//比较对象的属性，合并时是否有冲突
util._common.compareObjs(util, util._array, util._common, util._date, util._detection, util._file, util._string, util._isWx, util._storage)

export default {
  ...util,
  ...util._array,
  ...util._common,
  ...util._date,
  ...util._detection,
  ...util._file,
  ...util._string,
  ...util._isWx,
  ...util._storage
}