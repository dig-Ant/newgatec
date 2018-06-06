'use strict';

// loopback request uri path
export default class lbapi {
  constructor() {
    this.url = ""
  }

  // base request path
  getBaseRoute() {
    return `${this.url}`;
  }
  
  getWxSvcRoute() {
    return `${this.getBaseRoute()}/WxSvcs`
  }

  getSharepublicRoute() {
    return `${this.getBaseRoute()}/sharepublic`
  }
  getShareprivateRoute() {
    return `${this.getBaseRoute()}/shareprivate`
  }
  getUserpublicRoute() {
    return `${this.getBaseRoute()}/userpublic`
  }
  getUserprivateRoute() {
    return `${this.getBaseRoute()}/userprivate`
  }
  getCbizpublicRoute() {
    return `${this.getBaseRoute()}/cbizpublic`
  }
  getCbizprivateRoute() {
    return `${this.getBaseRoute()}/cbizprivate`
  }

  // get accessToken 
  getAccessTokenRoute() {
    return `${this.getSharepublicRoute()}/getAccessToken`
  }

  // test api
  getInfoRoute() {
    return `${this.getSharepublicRoute()}/getInfo`
  }

  // -------------------- 激活用户 -----------------
  // 短信相关基础route
  getSmsRoute() {
    // return `${this.getBaseRoute()}/Anons`
    return `${this.getBaseRoute()}/Anons`
  }

  // 发送短信验证码
  getSmsCodeRoute() {
    return `${this.getSharepublicRoute()}/smsCodeSend`
    // return `${this.getSmsRoute()}/smsCodeSend`
  }

  // 激活手机号
  getUserActivateRoute() {
    return `${this.getUserprivateRoute()}/user_activate`
  }


  // 获取 wx js sdk config
  getWxConfigRoute() {
    return `${this.getSharepublicRoute()}/getWxConfig`
  }

  //------------------ 用户身份验证 ---------------
  // user 判断用户是否需要验证
  getIsVerifyUserRoute() {
    return `${this.getUserprivateRoute()}/is_verify_user`
  }

  // user 获取用户草稿
  getIdentityDraftRoute() {
    return `${this.getUserprivateRoute()}/get_identity_draft`
  }
  // user 保存用户草稿
  saveIdentityDraftRoute() {
    return `${this.getUserprivateRoute()}/save_identity_draft`
  }
  // user 保存用户草稿
  getGeneralIdCardRoute() {
    return `${this.getUserprivateRoute()}/general_id_card`
  }
  // user 保存用户草稿
  getValidateUserRoute() {
    return `${this.getUserprivateRoute()}/validate_user`
  }
  // user 身份验证失败转人工
  getApplyManualReviewRoute() {
    return `${this.getUserprivateRoute()}/apply_manual_review`
  }

  // ----------------- 薪资查询 ----------------
  // 判断用户是否有查询薪资密码
  getPlantStatusRoute() {
    return `${this.getCbizprivateRoute()}/plant_status`
  }
  // 发送短信
  getPaySmsSendRoute() {
    return `${this.getCbizprivateRoute()}/pay_smsSend`
  }
  // 忘记密码注册密码接口
  getSetPasswordRoute() {
    return `${this.getCbizprivateRoute()}/forGet`
  }
  // 薪酬查询登录
  getSalaryLoginRoute() {
    return `${this.getCbizprivateRoute()}/login`
  }
}