// import * as handleTokenSvc from '../services/handleToken';
import * as userSvc from '../services/user';

export default {

  namespace: 'validUser',

  state: {
    noticeData: ''
  },
  reducers: {
    changeData(state, { payload: noticeData }) {
      return {
        ...state,
        noticeData
      }
    }
  },

  effects: {
    *getIsVerifyUser({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.getIsVerifyUser);
      yield put({ type: 'changeData', payload: data.body.state });
    },
    // 获取草稿
    *getIdentityDraft({ payload }, { call, put }) {
      let data = yield call(userSvc.getIdentityDraft);
      console.log('获取草稿--',data);
    },
    // 保存草稿
    *getIdentityDraft({ payload }, { call, put }) {
      let data = yield call(userSvc.getIdentityDraft);
      console.log('获取草稿--',data);
    },
    

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },



};
