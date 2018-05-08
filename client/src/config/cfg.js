export default {
  server_base_url: "http://9320ac9d.ngrok.io",//后台域名
  page_route: "/",
  api_route: "/api",
  kong_base_url: "http://10.186.1.222:8000",
  kong_route: '/wx_svc',
  kong_Uc: '/cf_api',
  access_token: 'access_token',
  wxCfg: {
    appid: 'wx705a4d4af2a47e55',
    redirect_uri: 'http://2a8dd016.ngrok.io/#/wxCode',
    scope: 'snsapi_base',
    wxState: '1'
  }

}