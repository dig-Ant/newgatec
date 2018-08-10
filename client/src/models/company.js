import * as userSvc from '../services/user';
import util from 'utils/util';
import cfg from 'cfg/cfg';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'company',
  state: {
    companyList: [],
    featureList: [],
    selectCarousel: 0
  },
  reducers: {
    changeCompanyList(state, { payload: companyList }) {
      return {
        ...state,
        companyList
      }
    },
    changeFeatureList(state, { payload: featureList }) {
      return {
        ...state,
        featureList
      }
    },
    changeSelectCarousel(state, { payload: selectCarousel }) {
      return {
        ...state,
        selectCarousel
      }
    },

  },
  effects: {
    // 获取企业列表
    *getCompanyList({ payload }, { call, put, select }) {
      let selectC = yield select(state => state.company.selectCarousel);
      // let resData = yield call(userSvc.getCompanyList);
      let resData = {
        body: [
          { name: '才赋有限公司', id: 100 },
          { name: '阿里无线公司', id: 101 },
          { name: '哔哩哔哩邮箱公司', id: 102 },
          { name: '我家邮箱公司', id: 103 },
          { name: '各种公司', id: 104 },
          { name: '你猜公司', id: 105 },
        ]
      }
      if (resData.body) {
        yield put({
          type: 'changeCompanyList',
          payload: resData.body
        });
        console.log('selectC',selectC);
        // 获取第一次公司
        yield put({
          type: 'getCompanyBtnList',
          payload: resData.body[selectC].id
        });
      }

    },
    // 根据企业获取 功能列表
    *getCompanyBtnList({ payload: id }, { call, put }) {
      // let resData = yield call(userSvc.getCompanyBtnList, id);
      let resData = {
        body: [
          { name: id + '入职资料', type: 'type1' },
          { name: '薪酬查询', type: 'type2' },
          { name: '社保公积', type: 'type3' },
          { name: '测试1', type: 'type4' },
          { name: '邮箱', type: 'type5' },
          { name: '你猜公司', type: 'type6' },
        ]
      }
      console.log('获取功能列表');

      if (resData.body) {
        yield put({
          type: 'changeFeatureList',
          payload: resData.body
        });
      }


    },
    // 根据列表 请求 列表的权限
    *getFormList({ payload: id }, { call, put }) {
      let resData = yield call(userSvc.getFormList, id);

    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}