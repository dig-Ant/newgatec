import * as userSvc from '../services/user';
import util from '../utils/util';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
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
    imgData: [
      {
        idCardSide: 0,
        localData: '',
      }, {
        idCardSide: 1,
        localData: '',
      }
    ]
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
      if(!data.error) {
        yield put({ type: 'changeData', payload: data.body.state });
      }
    },
    // 获取草稿
    *getIdentityDraft({ payload }, { call, put }) {

      let data = yield call(userSvc.getIdentityDraft);
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
        Toast.success('保存草稿成功', 1);
        yield put(routerRedux.replace('/homepage'))
      }
      console.log('保存草稿--', res);
    },
    // 获取ai识别图片信息
    *getGeneralIdCard({ payload: data }, { call, put, select }) {
      let imgData = yield select(state => state.validUser.imgData);
      let formData = new FormData();
      formData.append('file', data.localData.split(',')[1]);
      formData.append('id_card_side', data.idCardSide == 0 ? 'front' : 'back');
      formData.append('fname', 'yang.jpeg');

      let res = yield call(userSvc.getGeneralIdCard, formData);
      imgData[data.idCardSide].localData = data.localData;
      if (!res.error) {
        yield put({
          type: 'changeImgData',
          payload: imgData
        });
        yield put({
          type: 'changeFormData',
          payload: res.body
        });
      }

    },
    // 验证失败转人工
    *getApplyManualReview({ payload: data }, { call, put }) {

      let res = yield call(userSvc.getApplyManualReview);

      if (!res.error) {
        Toast.success('success !', 1);
        yield put(routerRedux.push('/resAwait'));
      };
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },



};
