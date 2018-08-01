import * as userSvc from '../services/user';
import util from 'utils/util';
import cfg from 'cfg/cfg';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'salary',

  state: {
    isShowRegistModel: false,//控制没注册密码提示框显示
    yearArray: [],
    salaryMsg: [],
    salary_obj: {},
    btn: 'salaryList',
    yearSelect: null
  },
  reducers: {
    changeIsShowRegistModel(state, { payload: isShowRegistModel }) {
      return {
        ...state, isShowRegistModel
      }
    },
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
    changeBtn(state, { payload: btn }) {
      return {
        ...state, btn
      }
    },
    changeYearSelect(state, { payload: yearSelect }) {
      return {
        ...state, yearSelect
      }
    },
  },

  effects: {
    // 判断用户是否存在密码
    *getPlantStatus({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.getPlantStatus);
      // let data = {
      //   body: {
      //     state: 0
      //   }
      // }
      if (data.body) {
        yield put({
          type: 'changeIsShowRegistModel',
          payload: data.body.state == 0 ? true : false
        });
      }
      console.log('判断用户是否存在密码', data);
    },
    //发送短信
    *smsSend({ payload }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.getPaySmsSend);
      // let data = {
      //   body: {
      //     message: '短信已发送至150******3371'
      //   }
      // }
      if (data.body) {
        Toast.success(data.body.message, 2);
      }
      console.log('短信', data);
    },
    // 提交注册
    *setPassword({ payload: form }, { call, put }) {  // eslint-disable-line
      let data = yield call(userSvc.setPassword, form);
      // let data = {
      //   body: {plant_id: 2}
      // }
      if (data.body) {
        yield put(routerRedux.replace('/salaryPwd'));
        console.log('提交注册', data);
      }

    },
    // 薪酬登录
    *salaryLogin({ payload: pwd }, { call, put, select }) {  // eslint-disable-line
      let btn = yield select(state => state.salary.btn);
      // 获取 plant_id 持久化数据
      let data = yield call(userSvc.salaryLogin, pwd);
      // let data = {
      //   body: {plant_id: 2}
      // }
      if (data.body) {
        console.log('btn--', btn);
        window.sessionStorage.setItem(cfg.plant_id, data.body.plant_id);
        yield put(routerRedux.replace(`/${btn}`));

      }
    },
    // 获取有薪资的年份集合
    *getYearArray({ payload }, { call, put, select }) {  // eslint-disable-line
      let obj = {
        plant_id: util.get_s(cfg.plant_id)
      }
      let yearSelect = yield select(state => state.salary.yearSelect);
      let data = yield call(userSvc.getYearArray, obj);
      console.log('data--', data);
      // let data = {
      //   body: {year: [2018,2017,2016]}
      // }
      if (data.body) {
        if (data.body.year.length == 0) {
          Toast.fail('暂没有您的薪资数据', 2);
          return;
        }
        yield put({
          type: 'getPlantSlect',
          payload: { year: yearSelect || data.body.year[0] }
        });
        yield put({
          type: 'changeYearArray',
          payload: data.body.year
        });
      } else if (data.error) {
        yield put(routerRedux.push('/salaryPwd'));
      }
    },
    // 获取有薪资的年份集合
    *getPlantSlect({ payload: dateObj }, { call, put }) {  // eslint-disable-line
      let yearObj = {
        plant_id: util.get_s(cfg.plant_id),
        year: dateObj.year
        // month: dateObj.month
      }
      let data = yield call(userSvc.getPlantSlect, yearObj);
      console.log('获取有薪资的年份集合---', data);

      if (data.body) {
        yield put({
          type: 'changeSalaryMsg',
          payload: data.body.data
        });
      } else if (data.error) {
        yield put(routerRedux.push('/salaryPwd'));
      }
    },
    // 用户已读确认
    *getPlantRead({ payload: rowData }, { call, put }) {  // eslint-disable-line
      let newObj = {
        plant_id: util.get_s(cfg.plant_id),
        payslip_id: rowData.id
      }
      console.log('用户已读确认', rowData);
      // console.log(rowData)
      let data = yield call(userSvc.getPlantRead, newObj);

      if (data.body && data.body.state == 1) {
        yield put(routerRedux.push(`/salaryData/${rowData.id}`));
      }
    },
    // 获取用户详情
    *getSalaryInfo({ payload: id }, { call, put }) {  // eslint-disable-line
      let newObj = {
        plant_id: util.get_s(cfg.plant_id),
        id: id
      }
      let data = yield call(userSvc.getPay_detail, newObj);
      console.log('获取用户详情', data);
      yield put({
        type: 'changeSalary_obj',
        payload: data.body
      })
      // 存跳转到ticket 异议的信息
      let ticketInfo = JSON.stringify({
        id: data.body.id,
        clt_key: 0,
        info: {
          year: data.body.year,
          month: data.body.month,
          pay_type: data.body.pay_type,
        },
        serverType: 'salary'
      });
      util._storage.set_s(cfg.ticket_info, ticketInfo);
      // window.sessionStorage.setItem(cfg.ticket_info, ticketInfo);
    },

    // 跳转 页面指向
    *jumpPage({ payload: btn }, { call, put }) {
      yield put({
        type: 'changeBtn',
        payload: btn
      });
      yield put(routerRedux.push('/salaryPwd'));
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let pathName = pathname.split('/').slice(0, 2).join('/');
        window._hmt.push(['_trackPageview', '/#' + pathname]);
        if (
          pathName !== '/salaryList' &&
          pathName !== '/salaryData' &&
          pathName !== '/complaint' &&
          pathName !== '/welfareList' &&
          pathName !== '/welfareData' &&
          pathName !== '/ticket' &&
          pathName !== '/ticketRes'
        ) {
          window.sessionStorage.removeItem(cfg.plant_id);
        }
      });
    }
  },

};
