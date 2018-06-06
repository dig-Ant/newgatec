import * as userSvc from '../services/user';
import util from '../utils/util';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'salary',

  state: {
    isShowRegistModel: false,//控制没注册密码提示框显示
    isShowPwdModel: false,//控制密码错误提示框显示
  },
  reducers: {
    changeIsShowRegistModel(state, { payload: isShowRegistModel }) {
      return {
        ...state,
        isShowRegistModel
      }
    },
    changeIsShowPwdModel(state, { payload: isShowPwdModel }) {
      return {
        ...state,
        isShowPwdModel
      }
    },
  },

  effects: {
    // 判断用户是否存在密码
    *getPlantStatus({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.getPlantStatus);
      // let data = {
      //   body: {
      //     state: 0
      //   }
      // }
      if (data.body) {
        yield put({
          type: 'changeIsShowRegistModel',
          payload: data.body.state == 0 ? true : false
        });
      }
      console.log('判断用户是否存在密码', data);
    },
    //发送短信
    *smsSend({ payload }, { call, put }) {  // eslint-disable-line
      // let data = yield call(userSvc.getPaySmsSend);
      let data = {
        body: {
          message: '短信已发送至150******3371'
        }
      }
      if (data.body) {
        Toast.success(data.body.message, 2);
      }
      console.log('短信', data);
    },
    // 提交注册
    *setPassword({ payload: form }, { call, put }) {  // eslint-disable-line
      // let data = yield call(userSvc.setPassword, form);
      let data = {
        body: {plant_id: 2}
      }
      if (data.error) {
        Toast.fail(data.error.message, 2);
        return;
      }
      yield put(routerRedux.push('/salaryPwd'));
      console.log('提交注册', data);
    },
    // 薪酬登录
    *salaryLogin({ payload: pwd }, { call, put }) {  // eslint-disable-line
      // 获取 plant_id 持久化数据
      console.log('pwd---',pwd);
      let data = yield call(userSvc.salaryLogin, pwd);
      // let data = {
      //   body: {plant_id: 2}
      // }
      if (data.error) {
        // Toast.fail(data.error.message, 2);
        yield put({
          type: 'changeIsShowPwdModel',
          payload: data.error ? true : false
        });
        // yield put(routerRedux.push('/registPwd'));
        return;
      }
      // yield put(routerRedux.push('/salaryPwd'));
      console.log('薪酬登录', data);
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },



};
