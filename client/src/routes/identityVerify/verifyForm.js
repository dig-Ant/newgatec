import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './verifyForm.less';
import { connect } from 'dva';
import { List, InputItem, Button, WhiteSpace, Picker, TextareaItem, DatePicker, NoticeBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import util from '../../utils/util';
import moment from 'moment';
import request from '../../utils/request';
import ImagePick from '../../components/ImagePick/ImagePick';

import NoticeBars from '../../components/NoticeBars/NoticeBars';

const Item = List.Item;
const Brief = Item.Brief;

const seasons = [[
  {
    label: '中国大陆身份证',
    value: 'id_card',
  },
  {
    label: '中国人护照',
    value: 'chinese_passport',
  },
  {
    label: '外国人护照',
    value: 'foreign_passport',
  },
]];
const sexPickerSource = [[
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  }
]]


class VerifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      date: util.getStrToDate(),
      identity: ['id_card'],
      names: ''
    }
    this.time = '';

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'wxSdk/setConfig'
    });
    //获取草稿
    this.props.dispatch({
      type: 'validUser/getIdentityDraft'
    });
  }

  // form 对象格式处理
  handleFormFormat = (obj, toBackendData) => {
    if (obj && toBackendData == true) {
      return {
        id_type: obj.id_type[0],
        name: obj.name,
        gender: obj.gender[0],
        folk: obj.folk,
        date_of_birth: util.getDateToStr(obj.date_of_birth),
        hukou_address: obj.hukou_address,
        id_number: obj.id_number,
        issuance: obj.issuance,
        start_date: util.getDateToStr(obj.start_date),
        end_date: util.getDateToStr(obj.end_date)
      }
    } else {
      return {
        id_type: [obj.id_type],
        name: obj.name,
        gender: [obj.gender],
        folk: obj.folk,
        date_of_birth: util.getStrToDate(obj.date_of_birth),
        hukou_address: obj.hukou_address,
        id_number: obj.id_number,
        issuance: obj.issuance,
        start_date: util.getStrToDate(obj.start_date),
        end_date: util.getStrToDate(obj.end_date)
      }
    }
  }

  // 提交表单
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {
        let formObj = this.props.form.getFieldsValue();
        // formObj.
        let newForm = this.handleFormFormat(formObj, true);
        console.log('res---', newForm);
        this.props.dispatch({
          type: 'validUser/getValidateUser',
          payload: newForm
        });
      } else {
        alert('Validation failed');
      }
    });
    // this.onReset();
  }

  // 存稿
  onSaveIdentityDraft = () => {
    let formObj = this.props.form.getFieldsValue();
    // formObj.
    let newForm = this.handleFormFormat(formObj, true);
    console.log('res---', newForm);
    this.props.dispatch({
      type: 'validUser/saveIdentityDraft',
      payload: newForm
    });

  }

  // 重置表单数据
  onReset = () => {
    let frontForm = ['name', 'gender', 'folk', 'date_of_birth', 'hukou_address', 'id_number']
    // this.props.form.setFieldsInitialValue(); 
    this.props.form.resetFields();
  }

  // 渲染step1 头部
  renderFirstListHeader = () => {
    return (
      <div className={styles.listHeader}>
        <p>Step1 上传您的证件</p>
      </div>
    )
  }
  // 渲染step2 头部
  renderSubListHeader = () => {
    return (
      <div className={styles.listHeader}>
        <p>Step2 填写正确的证件信息</p>
        <p style={{ fontSize: 12, marginTop: 10 }}>我们的AI会根据证件自动识别并帮助您填写表单信息。 但请您认真复核,填写自己正确的信息</p>
      </div>
    )
  }

  // 身份证件类型选择
  id_typeChange = (type, a) => {
    this.setState({
      identity: type
    });
  }

  // 添加图片
  addImage = (i) => {
    let _this = this;
    let src = '';
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        window.wx.getLocalImgData({
          localId: localIds[0], // 图片的localID
          success: async function (res) {
            // {localData: data:image/jgp;base64/,/9j/.....} ios
            // {localData: /9j/} android
            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            if (window.__wxjs_is_wkwebview) { // 如果是IOS，需要去掉前缀
              localData = localData.replace('jgp', 'jpeg');
            } else {
              localData = 'data:image/jpeg;base64,' + localData;
            }
            _this.props.dispatch({
              type: 'validUser/getGeneralIdCard',
              payload: {
                idCardSide: i,
                localData
              }
            });

          }
        });
      }
    });
    // return src;
  }

  delImage = (i) => {
    let dispatch = this.props.dispatch;
    // this.onReset();
    let data = {};
    if (i == 0) {
      data = {
        name: '',
        gender: '男',
        folk: '',
        date_of_birth: '2018-05-17 13:39:42',//2018-05-17 13:39:42
        hukou_address: '',
        id_number: '',
      }
    } else if (i == 1) {
      data = {
        issuance: '',
        start_date: '2018-05-17 13:39:42',
        end_date: '2018-05-17 13:39:42',
      }
    }
    dispatch({
      type: 'validUser/changeFormData',
      payload: data
    });
    dispatch({
      type: 'validUser/changeImgData',
      payload: [{
        idCardSide: 0,
        localData: '',
      },{
        idCardSide: 1,
        localData: '',
      }]
    });
  }

  // 渲染 step1 的 list 内容
  renderFirstListBody = () => {
    let imgData = this.props.imgData;

    let res = this.props.form.getFieldValue('id_type');
    if (res[0] === 'id_card') {
      return (
        <ImagePick addImage={this.addImage} delImage={this.delImage} type={'idCard'} data={imgData} />
      )
    }

  }

  // 渲染 step2 的 list 内容
  renderSubListBody = () => {
    const { getFieldProps, getFieldError } = this.props.form;
    const formData = this.handleFormFormat(this.props.formData);
    return (
      <div className={styles.subList}>
        <InputItem
          {...getFieldProps('name', {
            initialValue: formData.name,
            rules: [{ required: true, message: '姓名不能为空' }],
          })}
          clear
          error={!!getFieldError('name')}
          placeholder="请输入姓名"
        >姓名</InputItem>
        <Picker
          data={sexPickerSource}
          title="请选择性别"
          cascade={false}
          extra="请选择(必选)"
          {...getFieldProps('gender', {
            initialValue: formData.gender,
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">性别</Item>
        </Picker>
        <InputItem
          {...getFieldProps('folk', {
            initialValue: formData.folk,
            rules: [{ required: true, message: '名族不能为空' }]
          })}
          clear
          error={!!getFieldError('folk')}
          placeholder="请输入民族"
        >民族</InputItem>

        <DatePicker
          {...getFieldProps('date_of_birth', {
            initialValue: formData.date_of_birth,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
          minDate={util.getStrToDate('1984-4-6')}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">出生</Item>
        </DatePicker>
        <TextareaItem
          {...getFieldProps('hukou_address', {
            initialValue: formData.hukou_address,
            rules: [{ required: true, message: '地址不能为空' }]
          })}
          title="住址"
          autoHeight
          clear
          error={!!getFieldError('hukou_address')}
          placeholder="盛顿特区宾夕法尼亚大道1600号白宫"
          labelNumber={5}
          maxLength={55}
        />
        <InputItem
          {...getFieldProps('id_number', {
            initialValue: formData.id_number,
            rules: [{ required: true, message: '公民身份号码不能为空' }]
          })}
          clear
          error={!!getFieldError('id_number')}
          placeholder="请输入身份号码" type="number"
        >公民身份号码</InputItem>
        <InputItem
          {...getFieldProps('issuance', {
            initialValue: formData.issuance,
            rules: [{ required: true, message: '签发机关住址不能为空' }]
          })}
          clear
          error={!!getFieldError('issuance')}
          placeholder="请输入签发机关"
        >签发机关</InputItem>
        <DatePicker
          {...getFieldProps('start_date', {
            initialValue: formData.start_date,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
          minDate={util.getStrToDate('1984-4-6')}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">有效期限开始</Item>
        </DatePicker>
        <DatePicker
          {...getFieldProps('end_date', {
            initialValue: formData.end_date,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
          minDate={util.getStrToDate('1984-4-6')}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">有效期限结束</Item>
        </DatePicker>
      </div>
    )
  }


  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    const formData = this.handleFormFormat(this.props.formData);
    return (
      <div className={styles.container}>
        <NoticeBars ref={ref => this.notice = ref} type={0} />
        {/* <div>idCardSide:{this.props.imgData.idCardSide}</div> */}
        {/* step1  */}
        <List
          renderHeader={this.renderFirstListHeader}
        >
          <Picker
            data={seasons}
            title="选择证件类型"
            cascade={false}
            extra="请选择(必选)"
            {...getFieldProps('id_type', {
              initialValue: formData.id_type,
              onChange: this.id_typeChange
            })}
          >
            <Item arrow="horizontal">身份证件类型</Item>
          </Picker>
          {this.renderFirstListBody()}
        </List>

        {/* step2  */}
        <List
          renderHeader={this.renderSubListHeader}
          // renderFooter={() => {
            // return (
            //   <div>
            //     {getFieldError('name')}
            //     {getFieldError('address')}
            //     {getFieldError('idCard')}
            //     {getFieldError('organ')}
            //   </div>
            // )
          // }}
          className={styles.stepFirst}
        >
          {this.renderSubListBody()}
        </List>

        {/* foot button */}
        <div className={styles.submit}>
          <div><Button inline onClick={this.onSubmit}>填写完毕, 提交审核</Button><WhiteSpace /></div>
          <div><Button inline onClick={this.onSaveIdentityDraft}>存稿, 稍后继续</Button></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.activation,
    formData: state.validUser.formData,
    imgData: state.validUser.imgData
  }
}
const VerifyFormWrapper = createForm()(VerifyForm);
export default connect(mapStateToProps)(VerifyFormWrapper);
