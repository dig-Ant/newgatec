
import request, { requestAuth } from '../utils/request';
import cfg from '../config/cfg';
import api from './lb-api';

// 需要经过 kong 的请求
let kongApi = new api();
kongApi.url = cfg.kong_base_url;

// 判断用户登录状态
export async function getUserLogin(data) {
  return requestAuth(kongApi.getUserLoginRoute(), {
    body: {},
    api_name: 'userprivate'
  });
}
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
    body: data,
    api_name: 'userprivate'
  });
}
// 保存用户草稿
export async function saveIdentityDraft(data) {
  return requestAuth(kongApi.saveIdentityDraftRoute(), {
    body: data,
    api_name: 'userprivate'
  });
}

// 获取ai识别图片信息
export async function getGeneralIdCard(data) {
  return requestAuth(kongApi.getGeneralIdCardRoute(), {
    body: data,
    api_name: 'userprivate'
  });
}
// 转人工
export async function getApplyManualReview(data) {
  return requestAuth(kongApi.getApplyManualReviewRoute(), {
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
    body: data,
    api_name: 'cbizprivate'
  });
}
// 薪酬查询登录
export async function salaryLogin(data) {
  return requestAuth(kongApi.getSalaryLoginRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取薪酬年份查询
export async function getYearArray(data) {
  return requestAuth(kongApi.getYearArrayRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取薪酬年份查询
export async function getPlantSlect(data) {
  return requestAuth(kongApi.getPlantSlectRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 用户已读确认
export async function getPlantRead(data) {
  return requestAuth(kongApi.getPlantReadRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取用户详情
export async function getPay_detail(data) {
  return requestAuth(kongApi.getPay_detailRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// --------------- 社保公积金 -------------------
// 获取社保年份查询
export async function getSiYearArray(data) {
  return requestAuth(kongApi.getSiYearArrayRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取社保公积金年份具体数据查询
export async function getSiSelect(data) {
  return requestAuth(kongApi.getSiSelectRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 用户已读确认
export async function getSiPlantGet(data) {
  return requestAuth(kongApi.getSiPlantGetRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取社保公积金年份详细查询
export async function getSiHf(data) {
  return requestAuth(kongApi.getSiHfRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}

//  ------------------- 异议提交 ----------------------
// 异议提交
export async function getTkt_create(data) {
  return requestAuth(kongApi.getTkt_createRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 服务请求列表
export async function getTkt_list(data) {
  return requestAuth(kongApi.getTkt_listRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 服务请求历史列表 
export async function getTkt_over_list(data) {
  return requestAuth(kongApi.getTkt_over_listRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 列表置顶
export async function getTkt_sticky_state(data) {
  return requestAuth(kongApi.getTkt_sticky_stateRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 撤销一条服务
export async function getTkt_cancel(data) {
  return requestAuth(kongApi.getTkt_cancelRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 获取服务详情
export async function getTkt_detail(data) {
  return requestAuth(kongApi.getTkt_detailRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}
// 用户已读接口
export async function getTkt_close_reply(data) {
  return requestAuth(kongApi.getTkt_close_replyRoute(), {
    body: data,
    api_name: 'cbizprivate'
  });
}


// -------------------- 企业页面相关请求 -------------------

// 获取企业列表
export async function getCompanyList(data) {
  return requestAuth(kongApi.getCompanyListRoute(), {
    method: 'GET',
    api_name: 'userprivate'
  });
}
// 根据企业获取 功能列表
export async function getCompanyBtnList(data) {
  return requestAuth(kongApi.getCompanyBtnListRoute(), {
    body: data,
    api_name: 'userprivate'
  });
}
// 根据列表 请求 列表的权限
export async function getFormList(data) {
  return requestAuth(kongApi.getFormListRoute(), {
    body: data,
    api_name: 'userprivate'
  });
}