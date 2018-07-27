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
  kong_base_url: curEnv === ENV.dev ?"http://172.16.1.139:8000" : 
  'http://47.98.205.89:8000',
  kong_route: '/wx_svc',
  kong_Uc: '/cf_api',
  access_token: 'access_token',
  redirect_home: curEnv === ENV.dev ? 'http://52f67090.ngrok.io/#/home' : 
    'http://html.fortunehr.com.cn/#/home',
  wxCfg: {
    appid: curEnv === ENV.dev ? 'wx705a4d4af2a47e55' : 'wxb059193f2e95abc2',
    redirect_uri: curEnv === ENV.dev ? 'http://52f67090.ngrok.io/#/wxCode' : 
    'http://html.fortunehr.com.cn/#/wxCode',
    scope: 'snsapi_base',
    wxState: '1'
  },
  plant_id: 'plant_id',
  ticket_info: 'ticket_info'
}