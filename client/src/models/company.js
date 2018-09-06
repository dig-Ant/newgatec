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
    selectCarousel: 0,
    headerSelect: 0, //控制tab
    certificateInfo: {},
    formList: [],
    draftForm: {}
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
    changeHeaderSelect(state, { payload: headerSelect }) {
      return {
        ...state,
        headerSelect
      }
    },
    changeCertificateInfo(state, { payload: certificateInfo }) {
      return {
        ...state,
        certificateInfo
      }
    },
    changeFormList(state, { payload: formList }) {
      return {
        ...state,
        formList
      }
    },
    changeDraftForm(state, { payload: draftForm }) {
      return {
        ...state,
        draftForm
      }
    },

  },
  effects: {
    // 获取企业列表
    *getCompanyList({ payload }, { call, put, select }) {
      let selectC = yield select(state => state.company.selectCarousel);
      let resData = yield call(userSvc.getCompanyList);
      console.log('mock 企业列表', resData);
      // 'cst_list': [
      //   {
      //     'cst_id': 1, // 企业id
      //     'com_name': "杨桑公司", // 公司名
      //     'com_img': "", //公司图片id
      //     'state': "在职", // 雇员状态
      //     'task_state': 1, // 任务代办
      //     'integral': 556 // 积分
      //   },
      // let resData = {
      //   body: [
      //     { name: '才赋有限公司', id: 100 },
      //     { name: '阿里无线公司', id: 101 },
      //     { name: '哔哩哔哩邮箱公司', id: 102 },
      //     { name: '我家邮箱公司', id: 103 },
      //     { name: '各种公司', id: 104 },
      //     { name: '你猜公司', id: 105 },
      //   ]
      // }
      if (resData.body) {
        yield put({
          type: 'changeCompanyList',
          payload: resData.body.cst_list
        });
        console.log('selectC', selectC);
        // 获取第一次公司
        yield put({
          type: 'getCompanyBtnList',
          payload: resData.body.cst_list[selectC].cst_id
        });
      }

    },
    // 根据企业获取 功能列表
    *getCompanyBtnList({ payload: cst_id }, { call, put }) {
      let resData = yield call(userSvc.getCompanyBtnList, { cst_id });
      console.log('mock 功能列表', resData);
      // buttons: [
      //   {
      //     name: 'StaffInfo',
      //     task_id: 1
      //   },

      if (resData.body && resData.body.buttons) {
        yield put({
          type: 'changeFeatureList',
          payload: resData.body.buttons
        });
      }


    },
    // 查询证件信息
    *get_certificate_info({ payload: id_type }, { call, put }) {
      console.log('查询证件信息id_type',id_type);
      let resData = yield call(userSvc.get_certificate_info, { id_type });
      console.log('查询证件信息---', resData);
      // 根据 state 0 1 判断是否验证通过 表单只读 刚刚进来为空 
      if (resData.body.state != 0 && resData.body.state != 1) {
        console.log('刚刚进来无验证');
        yield put({
          type: 'changeCertificateInfo',
          payload: {}
        });
      } else if (resData.body) {
        yield put({
          type: 'changeCertificateInfo',
          payload: resData.body
        });
      }
    },
    // 提交身份验证
    *validate_user({ payload: obj }, { call, put }) {
      let resData = yield call(userSvc.validate_user, { obj });
      console.log('提交身份验证---', resData);
      // 跳转 填写基础信息表单
    },
    // 获取表单
    *get_collect_mod({ payload: task_id }, { call, put }) {
      let resData = yield call(userSvc.get_collect_mod, { task_id });
      console.log('获取表单---', resData);
      if(resData.body) {
        yield put({
          type: 'changeFormList',
          payload: resData.body.formList
        });
        yield put({
          type: 'get_collect_draft',
          payload: task_id
        });
      }
    },
    // 获取草稿
    *get_collect_draft({ payload: task_id }, { call, put }) {
      let resData = yield call(userSvc.get_collect_draft, { task_id });
      console.log('获取草稿---', resData);
      if(resData.body) {
        yield put({
          type: 'changeDraftForm',
          payload: resData.body
        });
      }
    },
    // 保存草稿
    *save_collect_draft({ payload: obj }, { call, put }) {
      console.log('baoc草稿--',obj);
      let resData = yield call(userSvc.save_collect_draft, obj);
      console.log('保存草稿---', resData);
      if(resData.body) {
        yield put(routerRedux.push({
          pathname: '/registerForm/submitInfo',
          // search: ''
        }));
      }
    },
    // 提交表单
    *save_collect_draft({ payload: obj }, { call, put }) {
      console.log('baoc草稿--',obj);
      let resData = yield call(userSvc.save_collect_draft, obj);
      console.log('保存草稿---', resData);
      if(resData.body) {
        yield put(routerRedux.push({
          pathname: '/registerForm/submitInfo',
          // search: ''
        }));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
}