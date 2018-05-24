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
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];


class VerifyForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      date: util.getStrToDate(),
      identity: ['护照'],
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
  // 提交表单
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        let formObj = this.props.form.getFieldsValue();
        // formObj.
        console.log('res---', formObj);
      } else {
        alert('Validation failed');
      }
    });
  }

  // 重置表单数据
  onReset = () => {
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
  // 调用wx触发相机相册
  onAddImageClick = (e) => {
    e.preventDefault();

    let this_ = this;
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        alert(localIds[0]);
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
            this_.img.src = localData;
            let formData = new FormData();
            formData.append('file', localData.split(',')[1]);
            formData.append('id_card_side', 'front');
            formData.append('fname', 'yang.jpeg');
            let rest = await request('http://172.16.1.139:8888/api/private/general_id_card', {
              method: 'POST',
              body: formData,
            });
            alert(JSON.stringify(rest));


          }
        });
      }
    });
  };

  // 添加图片
  addImage = () => {
    let img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526908066009&di=e12c2183fb6fd4ff807858fe48320933&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb3119313b07eca807f814fc39b2397dda1448309.jpg';
    return img;
  }

  // 渲染 step1 的 list 内容
  renderFirstListBody = () => {
    if (this.state.identity[0] === 'id_card') {
      return (
        <ImagePick addImage={this.addImage} type={'idCard'} />
      )
    }

  }

  // 渲染 step2 的 list 内容
  renderSubListBody = () => {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div className={styles.subList}>
        <InputItem
          {...getFieldProps('name', {
            initialValue: this.state.names,
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
            initialValue: ['女'],
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">性别</Item>
        </Picker>
        <InputItem
          {...getFieldProps('folk', {
            rules: [{ required: true, message: '名族不能为空' }]
          })}
          clear
          error={!!getFieldError('folk')}
          placeholder="请输入民族"
        >民族</InputItem>

        <DatePicker
          {...getFieldProps('date_of_birth', {
            initialValue: this.state.date,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">出生</Item>
        </DatePicker>
        <TextareaItem
          {...getFieldProps('hukou_address', {
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
            rules: [{ required: true, message: '公民身份号码不能为空' }]
          })}
          clear
          error={!!getFieldError('id_number')}
          placeholder="请输入身份号码" type="number"
        >公民身份号码</InputItem>
        <InputItem
          {...getFieldProps('issuance', {
            rules: [{ required: true, message: '签发机关住址不能为空' }]
          })}
          clear
          error={!!getFieldError('issuance')}
          placeholder="请输入签发机关"
        >签发机关</InputItem>
        <DatePicker
          {...getFieldProps('start_date', {
            initialValue: this.state.date,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">有效期限开始</Item>
        </DatePicker>
        <DatePicker
          {...getFieldProps('end_date', {
            initialValue: this.state.date,
            rules: [
              { required: true, message: 'Must select a date' },
            ],
          })}
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
    return (
      <div className={styles.container}>
        <NoticeBars ref={ref => this.notice = ref} type={0}/>
        
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
              // initialValue: this.state.identity,
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
          <div><Button inline onClick={this.onReset}>存稿, 稍后继续</Button></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.activation
  }
}
const VerifyFormWrapper = createForm()(VerifyForm);
export default connect()(VerifyFormWrapper);
