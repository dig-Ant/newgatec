
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';


// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url + cfg.kong_route

// 给用户发送验证码
export async function getCaptcha(data) {
  return requestAuth(kongApi.getSmsCodeRoute(), {
    method: 'POST',
    body: data
  });
}

// 给用户发送验证码
export async function activeUser(data) {
  console.log('data--',data);
  return requestAuth(kongApi.getInfoRoute(), {
    method: 'POST',
    body: { data }
  });
}

