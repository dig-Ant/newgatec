
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';

// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url

export async function getAccessToken(code) {
  return request(kongApi.getAccessTokenRoute(), {
    method: 'POST',
    body: { code }
  });
}

// test api
export async function getInfo(data) {
  return request(kongApi.getInfoRoute(), {
    method: 'POST',
    body: { data },
    // api_name: 'sharepublic'
  });
}

export async function getWxConfig(param) {
  return requestAuth(kongApi.getWxConfigRoute(), {
    method: "POST",
    body: param,
    // api_name: 'sharepublic'
  });
}