export default {
  server_base_url: "http://93e5f85c.ngrok.io",
  page_route: "/",
  api_route: "/api",
  kong_base_url: "http://10.186.1.222:8000",
  kong_route: '/wx_svc',
  wxCfg: {
    appid: 'wx705a4d4af2a47e55',
    redirect_uri: 'http://8ccd456d.ngrok.io/#/wxCode',
    scope: 'snsapi_base',
    wxState: '1'
  }

}