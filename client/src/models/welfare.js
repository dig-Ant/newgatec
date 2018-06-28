import * as userSvc from '../services/user';
import util from 'utils/util';
import cfg from 'cfg/cfg';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'welfare',

  state: {
    yearArray: [],
    welfareMsg: [],
    welfare_obj: {},
    welfare_info: {},
    yearSelect: null
  },
  reducers: {
    changeYearArray(state, { payload: yearArray }) {
      return {
        ...state, yearArray
      }
    },
    changeWelfareMsg(state, { payload: welfareMsg }) {
      return {
        ...state, welfareMsg
      }
    },
    changeWelfare_obj(state, { payload: welfare_obj }) {
      return {
        ...state, welfare_obj
      }
    },
    changeWelfare_info(state, { payload: welfare_info }) {
      return {
        ...state, welfare_info
      }
    },
    changeYearSelect(state, { payload: yearSelect }) {
      return {
        ...state, yearSelect
      }
    },
  },

  effects: {
    // 获取有社保公积金的年份集合
    *getYearArray({ payload }, { call, put, select }) {  // eslint-disable-line
      let obj = {
        plant_id: window.localStorage.getItem(cfg.plant_id)
      }
      let yearSelect = yield select(state => state.welfare.yearSelect);
      let data = yield call(userSvc.getSiYearArray, obj);
      console.log('data--', data);
      // let data = {
      //   body: {year: [2018,2017,2016]}
      // }
      if (data.body) {
        if(data.body.length == 0) {
          Toast.fail('暂没有您的社保数据',2);
          return;
        }
        yield put({
          type: 'getPlantSlect',
          payload: { year: yearSelect || data.body[0] }
        });
        yield put({
          type: 'changeYearArray',
          payload: data.body
        });
      } else if (data.error) {
        yield put(routerRedux.push('/salaryPwd'));
      }
    },
    // 获取有社保的年份具体数据
    *getPlantSlect({ payload: dateObj }, { call, put }) {  // eslint-disable-line
      let yearObj = {
        plant_id: window.localStorage.getItem(cfg.plant_id),
        year: dateObj.year
        // month: dateObj.month
      }
      let data = yield call(userSvc.getSiSelect, yearObj);
      console.log('获取有社保公积金的年份集合---', data);

      if (data.body) {
        yield put({
          type: 'changeWelfareMsg',
          payload: data.body
        });
      } else if (data.error) {
        yield put(routerRedux.push('/salaryPwd'));
      }
    },
    // 用户已读确认
    *getPlantRead({ payload: rowData }, { call, put }) {  // eslint-disable-line
      // console.log(rowData)
      let data = yield call(userSvc.getSiPlantGet, rowData);
      yield put({
        type: 'changeWelfare_obj',
        payload: rowData
      })
      if (data.body && data.body.state == 1) {
        yield put(routerRedux.push('/welfareData'));
      }
    },
    // 用户社保公积金详情查询
    *getSiHf({ payload: rowData }, { call, put, select }) {  // eslint-disable-line
      let { welfare_obj } = yield select(state => state.welfare);
      // console.log(rowData)
      let data = yield call(userSvc.getSiHf, welfare_obj);
      console.log('用户社保公积金详情查询---', data);
    
      if (data.body) {
        yield put({
          type: 'changeWelfare_info',
          payload: data.body
        })
        return;
      }
      yield put(routerRedux.replace('/welfareList'));
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // if (pathname !== '/salaryList' && pathname !== '/salaryData' && pathname !== '/complaint') {
        //   window.localStorage.removeItem(cfg.plant_id);
        // }
      });
    }
  },



};
