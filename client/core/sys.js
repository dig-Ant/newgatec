'use strict';

/**
 * @type
 */
const sys = module.exports;

sys.reg = function (pos, name, obj) {
  if (pos[name]) {
    // throw (`position of ${name} is already defined`);
  }
  pos[name] = obj;
}


/**
 * 配置类
 */
sys.cfg = require("./cfg").default,

/**
 * 基础功能函数库
 */
sys.lib = {
  base: require("../lib/base").default,
  util: require("../lib/util").default,
  http: require("../lib/http").default,
}