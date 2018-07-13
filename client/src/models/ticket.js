import * as handleTokenSvc from '../services/handleToken';

export default {

  namespace: 'ticket',

  state: {
    config: ''
  },

  reducers: {
    changeWxConfig(state, { payload: config }) {
      return {
        ...state,
        config
      }
    },
  },

  effects: {
    *getConfig({ payload }, { call, put, select }) {  // eslint-disable-line 
      let config = yield call(handleTokenSvc.getWxConfig);

      yield put({ type: 'changeWxConfig', payload: config.body });

    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },


};
