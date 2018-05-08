
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
    body: data,
    api_name: 'token_wx'
  });
}

// 需要经过 kong 的请求
let kongApi_uc = new api();
kongApi_uc.url = cfg.kong_base_url + cfg.kong_Uc

// 给用户发送验证码
export async function activeUser(data) {
  return requestAuth(kongApi_uc.getUserActivateRoute(), {
    method: 'POST',
    body: data,
    api_name: 'token_cf'
  });
}

