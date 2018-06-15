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
let curEnv = ENV.dev;
//http://47.98.205.89/
// 172.16.126.48 云
export default {
  server_base_url: "http://33332.fortunehr.com.cn",//后台域名
  page_route: "/",
  api_route: "/api",
  kong_base_url: curEnv == ENV.dev ?"http://172.16.1.139:8000" : 
  'http://localhost:8000',
  kong_route: '/wx_svc',
  kong_Uc: '/cf_api',
  access_token: 'access_token',
  wxCfg: {
    appid: curEnv == ENV.dev ? 'wx705a4d4af2a47e55' : 'wx27c35b485ac43ef7',
    redirect_uri: curEnv == ENV.dev ? 'http://995188bc.ngrok.io/#/wxCode' : 
    'http://31001.fortunehr.com.cn/#/wxCode',
    scope: 'snsapi_base',
    wxState: '1'
  },
  plant_id: 'plant_id'
}