// import * as handleTokenSvc from '../services/handleToken';
import * as userSvc from '../services/user';
import util from '../utils/util';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'validUser',

  state: {
    noticeData: '',
    formData: {
      id_type: 'id_card',
      name: '',
      gender: '男',
      folk: '',
      date_of_birth: '2018-05-17 13:39:42',//2018-05-17 13:39:42
      hukou_address: '',
      id_number: '',
      issuance: '',
      start_date: '2018-05-17 13:39:42',
      end_date: '2018-05-17 13:39:42',
      img_id_front: '',
      img_id_back: ''
    },
    imgData: [{
      idCardSide: 0,
      localData: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=365802004,2376021258&fm=27&gp=0.jpg',
    },{
      idCardSide: 1,
      localData: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4223191570,3601086825&fm=27&gp=0.jpg',
    }]
  },
  reducers: {
    changeData(state, { payload: noticeData }) {
      return {
        ...state,
        noticeData
      }
    },
    changeFormData(state, { payload: formData }) {
      let obj = {
        ...state.formData,
        ...formData
      }
      return {
        ...state,
        formData: obj
      }
    },
    changeImgData(state, { payload: imgData }) {
      return {
        ...state,
        imgData
      }
    },
  },

  effects: {
    // 判断用户是否需要验证
    *getIsVerifyUser({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.getIsVerifyUser);
      console.log('是否需要验证',data);
      yield put({ type: 'changeData', payload: data.body.state });
    },
    // 获取草稿
    *getIdentityDraft({ payload }, { call, put }) {

      let data = yield call(userSvc.getIdentityDraft);
      console.log('获取草稿--', data);
      if (data.body && data.body.id_type) {
        yield put({ type: 'changeFormData', payload: data.body });
      }

    },
    // 提交验证
    *getValidateUser({ payload: formData }, { call, put }) {

      let data = yield call(userSvc.getValidateUser, formData);
      console.log('提交验证--', data.body);
      if (data.body.state == 1) {
        yield put(routerRedux.push('/resSuccess'));
        return;
      } else if (data.body.state == 2) {
        yield put(routerRedux.push('/resFail'));
        return;
      }
      yield put({
        type: 'changeFormData',
        payload: {
          id_type: 'id_card',
          name: '',
          gender: '男',
          folk: '',
          date_of_birth: '2018-05-17 13:39:42',//2018-05-17 13:39:42
          hukou_address: '',
          id_number: '',
          issuance: '',
          start_date: '2018-05-17 13:39:42',
          end_date: '2018-05-17 13:39:42',
          img_id_front: '',
          img_id_back: ''
        }
      });

    },
    // 保存草稿
    *saveIdentityDraft({ payload: data }, { call, put }) {
      console.log('data--', data);
      let res = yield call(userSvc.saveIdentityDraft, data);
      if (res.status == 200) {
        alert('保存草稿成功');
        yield put(routerRedux.replace('/homepage'))
      }
      console.log('保存草稿--', res);
    },
    // 获取ai识别图片信息
    *getGeneralIdCard({ payload: data }, { call, put }) {
      let formData = new FormData();
      formData.append('file', data.localData.split(',')[1]);
      formData.append('id_card_side', data.idCardSide == 0 ? 'front' : 'back');
      formData.append('fname', 'yang.jpeg');

      let res = yield call(userSvc.getGeneralIdCard, formData);
      yield put({
        type: 'changeImgData',
        payload: data
      });
      yield put({
        type: 'changeFormData',
        payload: res.body
      });
    },
    // 验证失败转人工
    *getApplyManualReview({ payload: data }, { call, put }) {
      
      let res = yield call(userSvc.getApplyManualReview);
      
      
      alert(JSON.stringify(res));
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },



};
