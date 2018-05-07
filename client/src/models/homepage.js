import * as handleTokenSvc from '../services/handleToken';

export default {

  namespace: 'homepage',

  state: {
    data: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getInfo({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(handleTokenSvc.getInfo,'请求接受成功');
      yield put({ type: 'changeData' ,payload: data.res.data});
    },
  
  },

  reducers: {
    changeData(state, { payload }) {
      return {
        ...state,
        data:payload
      }
    }
  },

};
