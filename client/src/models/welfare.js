import * as userSvc from '../services/user';
import util from 'utils/util';
import cfg from 'cfg/cfg';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'welfare',

  state: {
    yearArray: [],
    salaryMsg: [],
    salary_obj: {},
    yearSelect: null
  },
  reducers: {
    changeYearArray(state, { payload: yearArray }) {
      return {
        ...state, yearArray
      }
    },
    changeSalaryMsg(state, { payload: salaryMsg }) {
      return {
        ...state, salaryMsg
      }
    },
    changeSalary_obj(state, { payload: salary_obj }) {
      return {
        ...state, salary_obj
      }
    },
    changeYearSelect(state, { payload: yearSelect }) {
      return {
        ...state, yearSelect
      }
    },
  },

  effects: {
    // 获取有薪资的年份集合
    *getYearArray({ payload }, { call, put, select }) {  // eslint-disable-line
      let obj = {
        plant_id: window.localStorage.getItem(cfg.plant_id)
      }
      let yearSelect = yield select(state => state.salary.yearSelect);
      let data = yield call(userSvc.getSiYearArray, obj);
      console.log('data--', data);
      // let data = {
      //   body: {year: [2018,2017,2016]}
      // }
      if (data.body) {
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
    // 获取有薪资的年份集合
    *getPlantSlect({ payload: dateObj }, { call, put }) {  // eslint-disable-line
      let yearObj = {
        plant_id: window.localStorage.getItem(cfg.plant_id),
        year: dateObj.year
        // month: dateObj.month
      }
      let data = yield call(userSvc.getSiSelect, yearObj);
      console.log('获取有薪资的年份集合---', data);

      if (data.body) {
        yield put({
          type: 'changeSalaryMsg',
          payload: data.body
        });
      } else if (data.error) {
        yield put(routerRedux.push('/salaryPwd'));
      }
    },
    // 用户已读确认
    *getPlantRead({ payload: rowData }, { call, put }) {  // eslint-disable-line
      let newObj = {
        plant_id: window.localStorage.getItem(cfg.plant_id),
        payslip_id: rowData.id
      }
      // console.log(rowData)
      let data = yield call(userSvc.getPlantRead, newObj);
      console.log('用户已读确认---', data);
      yield put({
        type: 'changeSalary_obj',
        payload: rowData
      })
      if (data.body && data.body.state == 1) {
        yield put(routerRedux.push('/salaryData'));
      }
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
