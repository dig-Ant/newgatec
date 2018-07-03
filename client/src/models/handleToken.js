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

      let token = yield call(handleTokenSvc.getAccessToken, code);
      console.log('token---', token);
      // token_wx  token_cf
      // 储存token
      if (token.body) {
        window.localStorage.setItem(cfg.access_token, JSON.stringify(token.body));
        yield put({ type: 'changeToken', payload: token.body });
        window.location.replace('http://html.fortunehr.com.cn/#/homepage');
        // yield put(routerRedux.replace('/homepage'));
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}