
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';
// 不需要经过 kong 的请求
let lbapi = new api();
lbapi.url = cfg.server_base_url + cfg.api_route;

export async function getAccessToken(code) {
  return request(lbapi.getAccessTokenRoute(), {
    method: 'POST',
    body: { code }
  });
}


// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url + cfg.kong_route

// test api
export async function getInfo(data) {
  return requestAuth(kongApi.getInfoRoute(), {
    method: 'POST',
    body: { data },
    api_name: 'token_wx'
  });
}

export async function getWxConfig(param) {
  return requestAuth(kongApi.getWxConfigRoute(), {
    method: "POST",
    body: param,
    api_name: 'token_wx'
  });
}