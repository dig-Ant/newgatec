import * as handleTokenSvc from '../services/handleToken';
import { routerRedux } from 'dva/router';
import cfg from '../config/cfg';

export default {
  namespace: 'handleToken',
  state: {
    token: '',
    config: ''
  },
  reducers: {
    changeToken(state, { payload: token }) {
      return {
        ...state,
        token
      }
    },
    changeWxConfig(state, { payload: config }) {
      return {
        ...state,
        config
      }
    }

  },
  effects: {
    *getAccessToken({ payload: code }, { call, put }) {
      // let config = yield call(handleTokenSvc.getWxConfig);

      // yield put({ type: 'changeWxConfig', payload: config.body});
    

      let token = yield call(handleTokenSvc.getAccessToken, code);
      // token_wx  token_cf
      // 储存token
      window.localStorage.setItem(cfg.access_token,JSON.stringify(token.res));
      yield put({ type: 'changeToken', payload: token.res});
      yield put(routerRedux.replace('/homepage'));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}