import * as handleToken from '../services/handleToken';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'handleToken',
  state: {
    token: ''
  },
  reducers: {
    changeToken(state, { payload: token }) {
      return {
        ...state,
        token
      }
    }
  },
  effects: {
    *getAccessToken({ payload: code }, { call, put }) {
      let token = yield call(handleToken.getAccessToken, code);
      // 储存token
      window.localStorage.setItem('access_token',token.res);
      yield put({ type: 'changeToken', payload: token.res});
      // yield put(routerRedux.push('/homepage'));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}