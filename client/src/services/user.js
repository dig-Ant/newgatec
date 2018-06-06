
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

// 保存用户草稿
export async function getValidateUser(data) {
  return requestAuth(kongApi.getValidateUserRoute(), {
    method: 'POST',
    body: data,
    api_name: 'userprivate'
  });
}
// 保存用户草稿
export async function saveIdentityDraft(data) {
  return requestAuth(kongApi.saveIdentityDraftRoute(), {
    method: 'POST',
    body: data,
    api_name: 'userprivate'
  });
}

// 获取ai识别图片信息
export async function getGeneralIdCard(data) {
  return requestAuth(kongApi.getGeneralIdCardRoute(), {
    method: 'POST',
    body: data,
    api_name: 'userprivate'
  });
}
// 转人工
export async function getApplyManualReview(data) {
  return requestAuth(kongApi.getApplyManualReviewRoute(), {
    method: 'POST',
    body: {},
    api_name: 'userprivate'
  });
}


// ------------------- 薪资 查询-----------------
// 判断用户是否有查询薪资密码
export async function getPlantStatus(data) {
  return requestAuth(kongApi.getPlantStatusRoute(), {
    method: 'GET',
    api_name: 'cbizprivate'
  });
}
// 发送短信
export async function getPaySmsSend(data) {
  return requestAuth(kongApi.getPaySmsSendRoute(), {
    method: 'GET',
    api_name: 'cbizprivate'
  });
}
// 忘记密码注册密码接口
export async function setPassword(data) {
  return requestAuth(kongApi.getSetPasswordRoute(), {
    method: 'POST',
    body: data,
    api_name: 'cbizprivate'
  });
}
// 薪酬查询登录
export async function salaryLogin(data) {
  return requestAuth(kongApi.getSalaryLoginRoute(), {
    method: 'POST',
    body: data,
    api_name: 'cbizprivate'
  });
}

