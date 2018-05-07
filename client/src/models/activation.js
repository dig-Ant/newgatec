import { routerRedux } from 'dva/router';
import cfg from '../config/cfg';
import * as activeSvc from '../services/activation';

export default {
  namespace: 'activation',
  state: {
    tel: '',
    name: '',
    captcha: ''
  },
  reducers: {
    changeTel(state, { payload: tel }) {
      tel = tel.replace(/\s/g, "");
      return { ...state, tel }
    },
    changeName(state, { payload: name }) {
      return { ...state, name }
    },
    changeCaptcha(state, { payload: captcha }) {
      return { ...state, captcha }
    },
    resetForm(state, { payload }) {
      return { ...state, tel: '', name: '', captcha: '' }
    }
  },
  effects: {
    *getCaptcha({ payload: code }, { call, put, select }) {
      //发送请求
      let tel = yield select(state => state.activation.tel)
      let obj = {
        "phone": tel,
        "type": 1,
        "sign": "675",
        "modelId": "3839",
        "content": "{code}",
        "codeType": 1
      }

      let isSend = yield call(activeSvc.getCaptcha,obj);
      // let isSend = true;

      if (isSend.result){
        alert(isSend.result.msg);
      }



    },
    *activeUser({ payload: code }, { call, put, select }) {
      // 发送请求
      // let isActive = yield call();
      let isActive = true;
      console.log(isActive);
      // 判断激活成功 or 失败
      if (!isActive) {
        alert('激活失败,请确认您的手机号是否正确');
      }
      // alert('激活成功');
      yield put({ type: 'resetForm' });
      yield put(routerRedux.push('/homepage'));
      return;
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}