import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List, InputItem, DatePicker, TextareaItem, Modal, ImagePicker } from 'antd-mobile';
import styles from './identityCard.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';
import util from '../../utils/util';
import classNames from 'classnames';
import CompanyImg from '../../assets/company';
const alert = Modal.alert;

const Item = List.Item;


const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

// 证件
const cardType = [[
  {
    label: '香港澳门居民护照',
    value: 'passport_of_hk_macao_residents'
  },
  {
    label: '台胞证',
    value: 'taiwan_resident_pass'
  },
  {
    label: '外国护照',
    value: 'foreign_passport'
  },
  // {
  //   label: '军官证',
  //   value: 'certificate_of_officers'
  // },
  // {
  //   label: '警官证',
  //   value: 'police_officer_certificate'
  // },
  // {
  //   label: '中国护照',
  //   value: 'chinese_passport'
  // },
  // {
  //   label: '香港永久居留证',
  //   value: 'hk_permanent_residence_certificate'
  // },
  // {
  //   label: '澳门永久居留证',
  //   value: 'macao_permanent_residence_certificate'
  // },
  // {
  //   label: '台湾身份证',
  //   value: 'taiwan_identity_card'
  // },
  // {
  //   label: '外国永久居留证',
  //   value: 'foreign_permanent_residence_permit'
  // },
]];

class IdentityCard extends Component {
  constructor() {
    super();
    this.state = {
      // delectShow: false,
      cardlist: [
        {
          img: CompanyImg.idcard,
          type: 'front',
          deleteBtn: false
        },
        {
          img: CompanyImg.idcard,
          type: 'back',
          deleteBtn: false
        },
      ],
      idCardList: [
        { // 单个表单填写项目要素
          field: 'name', //字段名 对应上传给后台的字段名
          text: '证件姓名', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写姓名', // 用户未填写表单时的提示信息
          value: '柴大宝', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素 时间类型
          field: 'gender', //字段名 对应上传给后台的字段名
          text: '性别', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'select', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请选择性别', // 用户未填写表单时的提示信息
          value: ['女'], // 填写的值 草稿时可能有数据
          errorMessage: '请选择性别',
          options: [[ // 选项的值  这是大美的要求 动态的可选值
            {
              label: '男', // 选项名 
              value: '男', // 选项对应值
            },
            {
              label: '女',
              value: '女',
            }
          ]]
        },
        { // 单个表单填写项目要素
          field: 'folk', //字段名 对应上传给后台的字段名
          text: '民族', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写民族', // 用户未填写表单时的提示信息
          value: '汉', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素 时间类型
          field: 'date_of_birth', //字段名 对应上传给后台的字段名
          text: '证件生日', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
        { // 单个表单填写项目要素
          field: 'id_address', //字段名 对应上传给后台的字段名
          text: '证件住址', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'textarea', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写证件住址', // 用户未填写表单时的提示信息
          value: '上海市花木路888弄99999号', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素
          field: 'id_number', //字段名 对应上传给后台的字段名
          text: '证件号码', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写证件号码', // 用户未填写表单时的提示信息
          value: 330382199707251732, // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素
          field: 'issuance', //字段名 对应上传给后台的字段名
          text: '签发机关', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写签发机关', // 用户未填写表单时的提示信息
          value: '莲花市公安局', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素 时间类型
          field: 'start_date', //字段名 对应上传给后台的字段名
          text: '有效期开始', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
        { // 单个表单填写项目要素 时间类型
          field: 'end_date', //字段名 对应上传给后台的字段名
          text: '有效期结束', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
      ],
      moreCardList: [
        { // 单个表单填写项目要素
          field: 'name', //字段名 对应上传给后台的字段名
          text: '证件姓名', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写姓名', // 用户未填写表单时的提示信息
          value: '柴大宝', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素 时间类型
          field: 'gender', //字段名 对应上传给后台的字段名
          text: '性别', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'select', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请选择性别', // 用户未填写表单时的提示信息
          value: ['女'], // 填写的值 草稿时可能有数据
          errorMessage: '请选择性别',
          options: [[ // 选项的值  这是大美的要求 动态的可选值
            {
              label: '男', // 选项名 
              value: '男', // 选项对应值
            },
            {
              label: '女',
              value: '女',
            }
          ]]
        },
        { // 单个表单填写项目要素 时间类型
          field: 'date_of_birth', //字段名 对应上传给后台的字段名
          text: '证件生日', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
        { // 单个表单填写项目要素
          field: 'id_number', //字段名 对应上传给后台的字段名
          text: '证件号码', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写证件号码', // 用户未填写表单时的提示信息
          value: 330382199707251732, // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素
          field: 'issuance', //字段名 对应上传给后台的字段名
          text: '签发机关', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写签发机关', // 用户未填写表单时的提示信息
          value: '莲花市公安局', // 填写的值 草稿时可能有数据
          errorMessage: '错误提示'
        },
        { // 单个表单填写项目要素 时间类型
          field: 'start_date', //字段名 对应上传给后台的字段名
          text: '有效期开始', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
        { // 单个表单填写项目要素 时间类型
          field: 'end_date', //字段名 对应上传给后台的字段名
          text: '有效期结束', //表单名
          readOnly: false,  // 是否显示
          required: true, // 是否必填项
          type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
          placeholder: '请填写生日', // 用户未填写表单时的提示信息
          value: 1534821290944, // 填写的值 草稿时可能有数据
          errorMessage: '请输入日期',
        },
      ],
      cardType: 'id_card',
      files: data,
      goBackState: '',
      id_type: 'passport_of_hk_macao_residents'
    }
  }

  componentDidMount() {
    // 查询证件信息
    let queryString = util.getQSJson();
    // {
    //   label: '香港澳门居民护照',
    //   value: 'passport_of_hk_macao_residents'
    //   label: '台胞证',
    //   value: 'taiwan_resident_pass'
    //   label: '外国护照',
    //   value: 'foreign_passport'
    // },
    if (queryString.task_id) {
      if (queryString.id_type) {
        this.props.dispatch({
          type: 'company/get_certificate_info',
          payload: queryString.id_type
        });
        this.setState({
          cardType: queryString.id_type,
          id_type: queryString.id_type
        });
      } else {
        this.props.dispatch({
          type: 'company/get_certificate_info',
          payload: 'id_card'
        });
      }
      if (queryString.state == 'goback') {
        this.setState({ goBackState: 'goback' });
      }
    }
    this.props.dispatch({
      type: 'company/changeHeaderSelect',
      payload: 0
    });

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.certificateInfo !== nextProps.companyData.certificateInfo) {
      let certificateInfo = nextProps.companyData.certificateInfo;
      if (this.state.cardType == 'id_card') {
        // 输入草稿
        this.setIdCardListInfo(certificateInfo);
      } else {
        certificateInfo = {
          ...certificateInfo,
          id_type: this.state.id_type
        }
        this.setIdCardListInfo(certificateInfo);
      }
    }
  }

  // 根据后台返回的 data 中 type 类型生成不同的组件
  switchItem(item) {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    let { certificateInfo } = this.props.companyData;
    if (certificateInfo.state == 1 || this.state.goBackState == 'goback') {
      item.readOnly = true;
    } else {
      item.readOnly = false;
    }
    const type = item.type;
    switch (type) {
      case 'int':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          placeholder={item.placeholder}
          style={{ width: '100%' }}
          type={'number'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'char':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          placeholder={item.placeholder}
          style={{ width: '100%' }}
          // type={'number'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'textarea':
        return <TextareaItem
          title={item.text}
          clear
          error={!!getFieldError(item.field)}
          placeholder={item.placeholder}
          ref={el => this.autoFocusInst = el}
          disabled={!!item.readOnly}
          autoHeight
          className={styles.textarea}
        />;
        break;
      case 'date':
        return <DatePicker
          minDate={util.getStrToDate('1984-04-06')}
          mode="date"
          title="选择您的出生日期"
          disabled={!!item.readOnly}
          extra="">
          <Item arrow="horizontal">{item.text}</Item>
        </DatePicker>
        break;
      case 'select':
        return (
          <Picker
            data={item.options}
            title={item.placeholder}
            cascade={false}
            disabled={!!item.readOnly}
            extra="请选择(必选)"
          >
            {/* {
              item.options.map((option, index) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            } */}
            <Item arrow="horizontal">{item.text}</Item>
          </Picker>
        )
      default:
        // return <Input />;
        break;
    }
  }
  // 点击删除图片
  deleteImg = (event, data) => {
    console.log('delete');
    event.stopPropagation();
    alert('Delete', '您是否要删除照片?', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: '删除', onPress: () => {
          let cardlist = [...this.state.cardlist];
          if (data.type == 'front') {
            cardlist[0].deleteBtn = false;
            cardlist[0].img = CompanyImg.idcard;
            this.setState({
              cardlist
            });
          } else if (data.type == 'back') {
            cardlist[1].deleteBtn = false;
            cardlist[1].img = CompanyImg.idcard;
            this.setState({
              cardlist
            });
          }


        }
      },
    ])

  }
  // 点击卡片 识别身份证 
  cardClick = (data) => {
    console.log(123);
    console.dir(this.deleteRef);
    let cardlist = [...this.state.cardlist];
    if (data.type == 'front') {
      cardlist[0].deleteBtn = true;
      cardlist[0].img = 'https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77094b36acaf2eddc494707c891001e939019339.jpg';
      this.setState({
        cardlist
      });
    } else if (data.type == 'back') {
      cardlist[1].deleteBtn = true;
      cardlist[1].img = 'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/50da81cb39dbb6fd9e90dbb30d24ab18962b375f.jpg';
      this.setState({
        cardlist
      });
    }


  }
  // 渲染身份证选择组件
  renderAiCard = () => {
    let cardlist = [
      {
        img: CompanyImg.idcard,
        type: 'front',
        deleteBtn: false
      },
      {
        img: CompanyImg.idcard,
        type: 'back',
        deleteBtn: false
      },
    ]
    return (
      <div className={styles.aiCardBox}>
        {
          this.state.cardlist.map((v, i) => {
            return (
              <div
                key={'cardlist' + i}
                className={styles.cardItem}
                onClick={() => this.cardClick(v)}
              >
                <img
                  ref={img => this.frontImg = img}
                  src={v.img} alt=""
                />
                {v.deleteBtn ?
                  <div
                    ref={deletes => this.deleteRef = deletes}
                    onClick={(e) => this.deleteImg(e, v)}
                    className={styles.delete}>
                    <span>x</span>
                  </div> : null}
              </div>
            )
          })
        }
      </div>
    )
  }
  // 控制card只读桩体 
  setReadOnlyState = () => {
    let cardList = this.state.idCardList;
    let moreList = this.state.moreCardList;



  }
  // 渲染身份证具体列表
  renderCardList = () => {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    const ziduan = {
      'id_type': '',
      //  证件发行机构，开始日期，结束日期
      'state': 0 / 1,
      'img_id_front': '',
      'img_id_back': '',
      'c_img_id_list': []
    }
    let obj = this.state.idCardList;
    return (
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
        className={styles.idCardList}
      >
        {/* <div className={styles.cardList}> */}
        {
          obj.map((v, i) => {
            if (v.type == 'date') {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>
                  {
                    getFieldDecorator(v.field, {
                      // initialValue: new Date(v.value),
                      rules: [{ required: v.required, message: v.errorMessage }],
                      // onChange(v, b) {
                      //   console.log('000000',v, b);
                      // },
                    })(
                      this.switchItem(v)
                    )
                  }
                </div>
              )

            }
            return (
              <div className={styles.listItem} key={'identityIdCard' + i}>

                {
                  getFieldDecorator(v.field, {
                    // initialValue: v.value,
                    rules: [{ required: v.required, message: v.errorMessage }]
                  })(
                    this.switchItem(v)
                  )
                }
              </div>
            )
          })
        }
        {/* </div> */}
      </List>

    )
  }

  // 切换证件
  selectCard = () => {
    alert('提示', '如果切换证件类型,您在本页填写的内容将全部清空', [
      { text: '放弃', onPress: () => console.log('cancel') },
      {
        text: '我要切换', onPress: () => {
          this.setState({
            cardType: this.state.cardType == 'id_card' ? 'more' : 'id_card',// idcard more
          }, () => {
            if (this.state.cardType == 'id_card') {
              console.log('进来了');
              // let certificateInfo = this.props.companyData.certificateInfo;
              // 输入草稿
              // this.setIdCardListInfo(certificateInfo);
              this.reset();
            } else {
              this.reset();
              this.props.dispatch({
                type: 'company/get_certificate_info',
                payload: cardType[0][0].value
              });
            }
          });

        }
      },
    ])
  }

  // 渲染身份證類型
  renderIdCard = () => {
    let { certificateInfo } = this.props.companyData;
    return (
      <div className={styles.box}>
        <div className={styles.boxInfo}>
          {/* 证件类型 */}
          <div className={styles.cardSelect}>
            <div>
              <p>您需要使用的证件是</p>
              <p>《中华人民共和国居民身份证》</p>
            </div>
            {
              this.state.goBackState == 'goback' ? null : <div onClick={() => this.selectCard()}>
                <p>我要使用</p>
                <p>其他证件</p>
              </div>
            }

          </div>

          {/* ai识别身份证 */}
          {this.renderAiCard()}

          {/* 渲染表单 */}

          {this.renderCardList()}

          <div className={styles.submit}>
            {
              certificateInfo.state == 1 || this.state.goBackState == 'goback' ? <div>
                <Button
                  style={{ backgroundColor: '#ccc' }}
                  activeStyle={{ backgroundColor: '#ddd' }}
                  onClick={this.onFix}
                >点击修改</Button>
              </div> : null
            }
            <div><Button onClick={() => this.onSaveIdentityDraft('id_card')}>保存草稿,并进行下一步</Button></div>
          </div>
        </div>
      </div>
    )
  }

  //重置按钮
  reset = () => {
    const form = this.props.form;
    form.resetFields();
  }

  // 处理自动获取表单的格式 : 时间等
  handleFormFormat = (obj, type) => {
    // 表单 => 后台
    if (type == true) {
      if (obj.date_of_birth) {
        obj.date_of_birth = +obj.date_of_birth;
      }
      if (obj.start_date) {
        obj.start_date = +obj.start_date;
      }
      if (obj.end_date) {
        obj.end_date = +obj.end_date;
      }
    } else { // 后台 => 表单数据
      if (obj.date_of_birth) {
        obj.date_of_birth = new Date(obj.date_of_birth);
      }
      if (obj.start_date) {
        obj.start_date = new Date(obj.start_date);
      }
      if (obj.end_date) {
        obj.end_date = new Date(obj.end_date);
      }
    }
    return obj;
  }
  // 提交验证
  onSaveIdentityDraft = (cardType) => {
    // 验证身份 // 保存草稿

    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {

        // 根据类型进行判断
        let id_type = '';
        if (cardType == 'id_card') {
          id_type = 'id_card';
        } else {
          id_type = this.props.form.getFieldValue('id_type');
        }
        // 跳转
        let queryString = util.getQSJson();
        // const qs = util.serializeQS(queryString);
        // console.log('qs----',qs);
        this.props.dispatch(routerRedux.push({
          pathname: '/registerForm/fillInfo',
          // search: '?' + qs 
          search: `task_id=${queryString.task_id}&id_type=${id_type || 'id_card'}`
        }));

        let formObj = this.props.form.getFieldsValue();
        // formObj.
        let newForm = this.handleFormFormat(formObj, true);
        console.log('newForm---', newForm);
        this.props.dispatch({
          type: 'company/validate_user',
          payload: newForm
        });
      } else {
        alert('请填写必填的选项');
      }
    });

  }

  // 设置idcard 表单的值
  setIdCardListInfo = (obj) => {
    console.log('设置idcard 表单的值',obj);
    let { state, img_id_front, img_id_back, c_img_id_list, ...newObj } = obj;
    if (this.state.cardType == 'id_card') {
      let { id_type, ...cardObj } = newObj;
      newObj = cardObj;
    } else {
      let { folk, id_address, ...cardObj } = newObj;
      newObj = cardObj;
    }
    if (newObj.date_of_birth) {
      newObj.date_of_birth = new Date(newObj.date_of_birth);
    }
    if (newObj.start_date) {
      newObj.start_date = new Date(newObj.start_date);
    }
    if (newObj.end_date) {
      newObj.end_date = new Date(newObj.end_date);
    }
    if (newObj.id_type) {
      newObj.id_type = [newObj.id_type]
    }
    this.props.form.setFieldsValue(newObj);
  }

  // 渲染其他证件具体列表
  renderMoreList = () => {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    const ziduan = {
      'id_type': '',
      //  证件发行机构，开始日期，结束日期
      'state': 0 / 1,
      'img_id_front': '',
      'img_id_back': '',
      'c_img_id_list': []
    }

    let obj = this.state.moreCardList;

    return (
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
        className={styles.idCardList}
      >
        {/* <div className={styles.cardList}> */}
        {
          obj.map((v, i) => {
            if (v.type == 'date') {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>
                  {
                    getFieldDecorator(v.field, {
                      // initialValue: new Date(v.value),
                      rules: [{ required: v.required, message: v.errorMessage }]
                    })(
                      this.switchItem(v)
                    )
                  }
                </div>
              )

            }
            return (
              <div className={styles.listItem} key={'identityIdCard' + i}>

                {
                  getFieldDecorator(v.field, {
                    // initialValue: v.value,
                    rules: [{ required: v.required, message: v.errorMessage }]
                  })(
                    this.switchItem(v)
                  )
                }
              </div>
            )
          })
        }
        {/* </div> */}
      </List>

    )
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  onAddImageClick = (e) => {
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  };

  // 返回点击修改 弹出提示 修改将不保存后面的信息
  onFix = () => {
    // 清除后面的草稿 
    // 修改可修改状态
    alert('提示', '点击修改,会导致后面的草稿消失', [
      { text: '放弃', onPress: () => console.log('cancel') },
      {
        text: '我要修改', onPress: () => {
          this.setState({
            goBackState: ''
          });

        }
      },
    ])

  }
  // 渲染其他类型 
  renderMoreCard = () => {
    let { certificateInfo } = this.props.companyData;
    const { getFieldProps, getFieldError } = this.props.form;
    const _this = this;
    return (
      <div className={styles.box}>
        <div className={styles.boxInfo}>
          {/* 证件类型 */}
          <div className={styles.cardSelect}>
            <div>
              <p>您需要使用的证件是</p>
            </div>
            {
              certificateInfo.state == 1 || this.state.goBackState == 'goback' ? null : <div onClick={() => this.selectCard()}>
                <p>我要使用</p>
                <p>其他证件</p>
              </div>
            }

          </div>
          <List className={styles.idCardList}>
            <Picker
              data={cardType}
              title="请选择证件"
              cascade={false}
              extra="请选择(必选)"
              disabled={certificateInfo.state == 1 || this.state.goBackState == 'goback'}
              {...getFieldProps('id_type', {
                initialValue: ['passport_of_hk_macao_residents'],
                onChange(v, b) {
                  console.log(v, b);
                  _this.setState({
                    id_type: v[0]
                  });
                  _this.props.dispatch({
                    type: 'company/get_certificate_info',
                    payload: v[0]
                  });
                },
              })}
            >
              <Item arrow="horizontal">证件类型</Item>
            </Picker>
          </List>

          {/* 渲染表单 */}

          {this.renderMoreList()}
          {/* 上传证件照片 */}
          <div className={styles.submitPhoto}>
            <div className={styles.title}>
              <p>上传证件拍照件(含上述信息的整页)</p>
            </div>
            <div className={styles.selectImg}>
              <ImagePicker
                length="3"//当行的图片数量
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 3}
                onAddImageClick={this.onAddImageClick}
              />
            </div>
          </div>

          <div className={styles.submit}>
            {
              this.state.goBackState == 'goback' ? <div>
                <Button
                  style={{ backgroundColor: '#ccc' }}
                  activeStyle={{ backgroundColor: '#ddd' }}
                  onClick={this.onFix}
                >点击修改</Button>
              </div> : null
            }

            <div><Button onClick={() => this.onSaveIdentityDraft('more')}>保存草稿, 并进行下一步</Button></div>
          </div>
        </div>
      </div>
    )
  }
  // 渲染主体
  renderCardBody = () => {
    let { certificateInfo } = this.props.companyData;
    let type = this.state.cardType;
    if (type == 'id_card') {

      {/* 渲染身份证类型 */ }
      return this.renderIdCard();
    } else {
      return this.renderMoreCard();
    }

  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div className={styles.container}>
        {/* 渲染表单 */}

        {this.renderCardBody()}

      </div>
    )
  }
}

IdentityCard.defaultProps = {

};

IdentityCard.propTypes = {

};
function mapStateToProps(state) {
  return {
    companyData: state.company
  }
}

const IdentityCardWrapper = createForm()(IdentityCard);
export default connect(mapStateToProps)(IdentityCardWrapper);
