import * as handleTokenSvc from '../services/handleToken';

export default {

  namespace: 'wxSdk',

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
      console.log('调用');
      let config = yield call(handleTokenSvc.getWxConfig);

      yield put({ type: 'changeWxConfig', payload: config.body });

    },
    *setConfig({ payload }, { call, put, select }) {  // eslint-disable-line 
      let params = {
        debug: false,
        jsApiList: ["chooseImage","getLocalImgData"],
        url: window.location.href.split('#')[0]
      }
      let configOpt = yield call(handleTokenSvc.getWxConfig,params);
      console.log('configOpt---',configOpt);
      let { appId, debug, timestamp, signature,nonceStr,jsApiList } = configOpt.body;
      // console.log('config--',configOpt);
      window.wx.config({
        debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList:jsApiList// 必填，需要使用的JS接口列表
      });
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },


};
