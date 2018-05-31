import { routerRedux } from 'dva/router';
import cfg from '../config/cfg';
import * as activeSvc from '../services/activation';
import { Toast} from 'antd-mobile';

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
      let tel = yield select(state => state.activation.tel);
      let obj = {
        "phone": tel
      }
      let isSend = yield call(activeSvc.getCaptcha,obj);
      console.log('isSend',isSend);
      // let isSend = true;
      if (isSend.result){
        alert(isSend.result.msg);
      }
    },
    *activeUser({ payload: code }, { call, put, select }) {
      // 发送请求
      let { tel, name, captcha } = yield select(state => state.activation);
      //mobile,name,sms_code
      let obj = {
        mobile: tel,
        name: name,
        sms_code: captcha
      }
      console.log('tel---',obj);
      let isActive = yield call(activeSvc.activeUser, obj);
      // let isActive = true;
      console.log('isActive---',isActive.aa); 
      // 判断激活成功 or 失败
      if (isActive.error) {
        Toast.fail(isActive.error.message,2,null,false);
        return;
      }
      // alert('激活成功');
      Toast.success('手机号已激活',2,null,false); 
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