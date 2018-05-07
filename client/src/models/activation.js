import { routerRedux } from 'dva/router';
import cfg from '../config/cfg';

export default {
  namespace: 'activation',
  state: {
    tel: '',
    name: '',
    captcha: ''
  },
  reducers: {
    changeTel(state, { payload: tel }) {
      return { ...state, tel }
    },
    changeName(state, { payload: name }) {
      return { ...state, name }
    },
    changeCaptcha(state, { payload: captcha }) {
      return { ...state, captcha }
    },
    resetForm(state, { payload }) {
      return { ...state, tel: '',name: '', captcha: '' }
    }
  },
  effects: {
    *getCaptcha({ payload: code }, { call, put, select }) {
      //发送请求
      let tel = yield select(state => state.activation.tel)
      // let isSend = yield call();
      let isSend = true;

      if (isSend) alert('已发送验证码');
      //todo 倒计时启动

     

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
      return ;
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}