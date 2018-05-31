// import * as handleTokenSvc from '../services/handleToken';
import * as userSvc from '../services/user';
import util from '../utils/util';
import { routerRedux } from 'dva/router';
import { Toast, Button } from 'antd-mobile';
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
      localData: '',
    }, {
      idCardSide: 1,
      localData: '',
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
      alert('changeFormDAta ');
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
      alert('chagneImgData');
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
      console.log('是否需要验证', data);
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
      let random = Math.random();
      let formData = new FormData();
      formData.append('file', data.localData.split(',')[1]);
      formData.append('id_card_side', data.idCardSide == 0 ? 'front' : 'back');
      formData.append('fname', 'yang.jpeg');

      let res = yield call(userSvc.getGeneralIdCard, formData);
      alert(JSON.stringify(res));
      if (!res.error) {
        yield put({
          type: 'changeImgData',
          payload: data
        });
        yield put({
          type: 'changeFormData',
          payload: res.body
        });
      }

      // let res = {
      //   body: {
      //     name: '杨',
      //     gender: '男',
      //     folk: '汉族',
      //     date_of_birth: '1994-07-25 13:39:42',//2018-05-17 13:39:42
      //     hukou_address: '你家',
      //     id_number: '330382199407251732',
      //   }
      // };
      // let datas= [{
      //   idCardSide: 0,
      //   localData: 'http://img5.imgtn.bdimg.com/it/u=942910320,1513017347&fm=27&gp=0.jpg',
      // }, {
      //   idCardSide: 1,
      //   localData: '',
      // }]
      // alert(JSON.stringify(res));
      // if (!res.error) {
      //   yield put({
      //     type: 'changeImgData',
      //     payload: datas
      //   });
      //   yield put({
      //     type: 'changeFormData',
      //     payload: res.body
      //   });
      // }

    },
    // 验证失败转人工
    *getApplyManualReview({ payload: data }, { call, put }) {

      let res = yield call(userSvc.getApplyManualReview);

      if (!res.error) {
        Toast.success('Load success !!!', 1);
        yield put(routerRedux.push('/resAwait'));
      };
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },



};
