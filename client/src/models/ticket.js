import * as userSvc from '../services/user';
import cfg from 'cfg/cfg';
import { routerRedux } from 'dva/router';
import util from '../utils/util';

export default {

  namespace: 'ticket',

  state: {
    serverType: 'salary',
    beforeData: '',
    requestNum: '',
    ticketList: [],
    ticketOverList: [],
    ticketInfo: {
      tkt: {},
      flow: [],
      reply: {}
    }
  },

  reducers: {
    changeServerType(state, { payload: serverType }) {
      return {
        ...state,
        serverType
      }
    },
    changeBeforeData(state, { payload: beforeData }) {
      return {
        ...state,
        beforeData
      }
    },
    changeRequestNum(state, { payload: requestNum }) {
      return {
        ...state,
        requestNum
      }
    },
    changeTicketList(state, { payload: ticketList }) {
      return {
        ...state,
        ticketList
      }
    },
    changeTicketOverList(state, { payload: ticketOverList }) {
      return {
        ...state,
        ticketOverList
      }
    },
    changeTicketInfo(state, { payload: ticketInfo }) {
      return {
        ...state,
        ticketInfo
      }
    },
  },

  effects: {
    //服务提交
    *ticketSubmit({ payload: msg }, { call, put, select }) {  // eslint-disable-line 
      try {
        let ticket_info = JSON.parse(window.sessionStorage.getItem(cfg.ticket_info));
        let ticket_info1 = util.get_s(cfg.ticket_info);
        let obj = {};
        if (ticket_info) {
          if (ticket_info.serverType == 'salary') {
            obj = {
              tkt_type: 1,
              subject: '工资条疑义处理',
              plant_id: util.get_s(cfg.plant_id),
              ...msg
            }
          } else if (ticket_info.serverType == 'welfare') {
            obj = {
              tkt_type: 2,
              subject: '社保公积金答疑',
              plant_id: util.get_s(cfg.plant_id),
              ...msg
            }
          } else if (ticket_info.serverType == 'general') {
            obj = {
              tkt_type: 0,
              subject: '有关[?]的服务请求',
              // plant_id: util.get_s(cfg.plant_id),
              ...msg
            }
          } else if (ticket_info.serverType == 'validIdentity') {
            obj = {
              tkt_type: 3,
              subject: '有关身份验证的服务请求',
              plant_id: util.get_s(cfg.plant_id),
              ...msg
            }
          }
        }
        let data = yield call(userSvc.getTkt_create, obj);
        if (data.body && ticket_info.serverType == 'validIdentity') {
          yield put({
            type: 'changeRequestNum',
            payload: data.body.key
          });
          yield put(routerRedux.push('/resAwait'));
          return;
        }
        if (data.body) {
          yield put({
            type: 'changeRequestNum',
            payload: data.body.key
          });
          yield put(routerRedux.push('/ticketRes'));
        }
      } catch (e) {
        console.log('ticket,ticketSubmit error:', e);
      }
    },
    // 请求 服务请求的列表
    *getTicketList({ payload: id }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_list, {
        clt_key: 0
      });
      if (data.body) {
        yield put({
          type: 'changeTicketList',
          payload: data.body
        });
      }
      console.log('服务请求的列表ticketList---', data);
    },
    // 服务请求历史的列表
    *getTicketOverList({ payload: id }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_over_list, {
        clt_key: 0
      });
      if (data.body) {
        yield put({
          type: 'changeTicketOverList',
          payload: data.body
        });
      }
      console.log('服务请求历史的列表getTicketOverList---', data);
    },
    // 请求 置顶
    *ticketOnTop({ payload: obj }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_sticky_state, obj);
      if (data.body) {
        yield put({
          type: 'getTicketList',
          // payload: data.body
        });
      }
      console.log('置顶ticketOnTop---', data);
    },
    // 撤销一条消息
    *tkt_cancel({ payload: obj }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_cancel, obj);
      if (data.body) {
        yield put({
          type: 'getTicketList',
          // payload: data.body
        });
      }
      console.log('撤销一条消息---', data);
    },
    // 详情里面撤销一条消息
    *tkt_cancelInfo({ payload: obj }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_cancel, obj);
      if (data.body) {
        if (data.body.state == 0) {
          yield put(routerRedux.push('/ticketFail/1'));//撤销失败页面
        } else if (data.body.state == 1) {
          yield put(routerRedux.replace('/home/service'));
        }
      }
      console.log('服务详情撤销一条消息---', data);
    },
    // 用户已读接口
    *getTkt_close_reply({ payload: obj }, { call, put, select }) {
      let data = yield call(userSvc.getTkt_close_reply, obj);
      if (data.body) {
        yield put(routerRedux.replace('/home/service'));
      }
      console.log('用户已读接口---', data);
    },
    // 获取详情
    *getTkt_detail({ payload: obj }, { call, put, select }) {
      // window.sessionStorage.setItem('getTkt_detail',JSON.stringify(obj));
      let data = yield call(userSvc.getTkt_detail, obj);
      if (data.body) {
        yield put({
          type: 'changeTicketInfo',
          payload: data.body
        });
        // yield put(routerRedux.push('/ticketInfo'));
      }
      console.log('获取详情---', data);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (
          pathname !== '/ticket' &&
          pathname !== '/ticketRes' &&
          pathname !== '/salaryList' &&
          pathname !== '/salaryData'

        ) {
          // window.sessionStorage.removeItem(cfg.ticket_info);
        }
      });
    },
  },


}; 
