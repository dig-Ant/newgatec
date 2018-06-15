/**
 * Created by song on 23/04/2018.
 */
//环境变量定义
let ENV = {
    //开发
    dev: "dev",
    //staging
    staging: "staging",
    //产品
    prod: "prod",
    //本地
    local: "local"
}
//当前选用的环境
let curEnv = ENV.prod;
module.exports = {
    "wx_appid": curEnv == ENV.dev ? "wx705a4d4af2a47e55" : "wx27c35b485ac43ef7",
    "wx_secret": curEnv == ENV.dev ? "cc98d52f5449abd0be2fef8145261966" :
     "a5912946898eb67705db9e9ed88e8de4",
    "wx_token": "ActivityDemoToken",
    "wx_cb_domain": "2f4b2aa8.ngrok.io"
}