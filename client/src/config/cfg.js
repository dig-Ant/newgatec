export default {
  server_base_url: "http://8ad603f2.ngrok.io",//后台域名
  page_route: "/",
  api_route: "/api",
  kong_base_url: "http://172.16.1.139:8000",
  kong_route: '/wx_svc',
  kong_Uc: '/cf_api',
  access_token: 'access_token',
  wxCfg: {
    appid: 'wx705a4d4af2a47e55',
    redirect_uri: 'http://b86bc5a0.ngrok.io/#/wxCode',
    scope: 'snsapi_base',
    wxState: '1'
  }

}