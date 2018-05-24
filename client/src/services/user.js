
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';

// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url;

// 判断用户是否需要验证身份
export async function getIsVerifyUser(data) {
  return requestAuth(kongApi.getIsVerifyUserRoute(), {
    method: 'GET',
    api_name: 'userprivate'
  });
}

// 判断用户是否存在身份验证草稿
export async function getIdentityDraft(data) {
  return requestAuth(kongApi.getIdentityDraftRoute(), {
    method: 'GET',
    api_name: 'userprivate'
  });
}

