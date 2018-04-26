'use strict';
//@ts-check
const sys = require("../core/sys");

/**
 * 自定义基类模板
 * @class
 */
class base {
  constructor(classVar) {
    this._CLASS = (typeof classVar === 'function') ? classVar : base
    this._sys = sys;
  }

  /** 获取当前实例的一个新实例 */
  _getInstance() {
    return new this._CLASS();
  }
}

export default base;
