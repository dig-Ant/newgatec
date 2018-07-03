
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';


// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url;

// 给用户发送验证码
export async function getCaptcha(data) {
  return requestAuth(kongApi.getSmsCodeRoute(), {
    body: data,
    api_name: 'shareprivate'
  });
}

// 给用户发送验证码
export async function activeUser(data) {
  return requestAuth(kongApi.getUserActivateRoute(), {
    body: data,
    api_name: 'userprivate'
  });
}

