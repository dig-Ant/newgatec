import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List, InputItem, DatePicker, TextareaItem } from 'antd-mobile';
import styles from './registerForm.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';
import util from '../../utils/util';
import classNames from 'classnames';
// 子組件
import IdentityCard from '../infoCollect/identityCard';
import FillInfo from '../infoCollect/fillInfo';
import Material from '../infoCollect/material';
import SubmitInfo from '../infoCollect/submitInfo';

const Item = List.Item;

let obj = [
  {
    "分类名": "基本信息",
    isShow: true, // 是否显示
    "表单主体": [
      { // 单个表单填写项目要素
        field: 'name', //字段名 对应上传给后台的字段名
        text: '姓名', //表单名
        isShow: true,  // 是否显示
        required: true, // 是否必填项
        type: 'int', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
        placeholder: '请填写姓名', // 用户未填写表单时的提示信息
        value: '柴大宝', // 填写的值 草稿时可能有数据
        errorMessage: '错误提示'
      },
      { // 单个表单填写项目要素
        field: 'tel', //字段名 对应上传给后台的字段名
        text: '手机号', //表单名
        isShow: true,  // 是否显示
        required: true, // 是否必填项
        type: 'char', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
        placeholder: '请填写手机', // 用户未填写表单时的提示信息
        value: 15067773371, // 填写的值 草稿时可能有数据
        errorMessage: '错误提示'
      },
      { // 单个表单填写项目要素 时间类型
        field: 'birthDate', //字段名 对应上传给后台的字段名
        text: '出生日期', //表单名
        isShow: true,  // 是否显示
        required: true, // 是否必填项
        type: 'date', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
        placeholder: '请填写生日', // 用户未填写表单时的提示信息
        value: '2017-10-20 00:00:00', // 填写的值 草稿时可能有数据
        errorMessage: '请输入日期',
      },
      { // 单个表单填写项目要素 时间类型
        field: 'idType', //字段名 对应上传给后台的字段名
        text: '证件类型', //表单名
        isShow: true,  // 是否显示
        required: true, // 是否必填项
        type: 'select', //表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
        placeholder: '请填写生日', // 用户未填写表单时的提示信息
        value: ['女'], // 填写的值 草稿时可能有数据
        errorMessage: '请选择证件',
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
      {
        field: 'huji', // 图片需要传到哪里 哪个接口
        text: '上传证件照'
      }
    ]
  }
]

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      selectCarousel: 0,
      headerSelect: 0
    }
  }

  componentDidMount() {
    // 请求企业数据
    // this.props.dispatch({
    //   type: 'company/getCompanyList'
    // });
    let step = this.props.match.params.step;
    if (step) {
      const mapSelect = {
        identityCard: 0,
        fillInfo: 1,
        material: 2,
        submitInfo: 2
      }
      this.setState({
        headerSelect: mapSelect[step]
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.headerSelect !== nextProps.companyData.headerSelect) {
      console.log('tab----',nextProps.companyData.headerSelect);
      this.setState({
        headerSelect: nextProps.companyData.headerSelect
      });
    }

  }

  // 根据后台返回的 data 中 type 类型生成不同的组件
  switchItem(item) {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    const type = item.type;
    switch (type) {
      case 'int':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          placeholder={item.placeholder}
          style={{ width: '100%' }}
          type={'number'}
        >{item.text}</InputItem>;
        break;
      case 'char':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          placeholder={item.placeholder}
          style={{ width: '100%' }}
        // type={'number'}
        >{item.text}</InputItem>;
        break;
      case 'date':
        return <DatePicker
          minDate={util.getStrToDate('1984-04-06')}
          mode="date"
          title="选择您的出生日期"
          extra="Optional">
          <Item arrow="horizontal">{item.text}</Item>
        </DatePicker>
        break;
      case 'select':
        return (
          <Picker
            data={item.options}
            title="请选择性别"
            cascade={false}
            extra="请选择(必选)"
          >
            {/* {
              item.options.map((option, index) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            } */}
            <Item arrow="horizontal">性别</Item>
          </Picker>
        )
      default:
        // return <Input />;
        break;
    }
  }

  renderForm = () => {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    // 后台返回的数据格式
    const data = [
      {
        'field': 'jobid',
        'text': '员工编号',
        'errorMessage': '请输入员工编号',
        'required': true,
        'type': 'int',
        'placeholder': '灰色给用户提示语',
        'value': 100
      },
      {
        'field': 'name', // 参数名
        'text': '证件姓名', // 表单的左侧名字
        'errorMessage': '请输入姓名',// 错误提示信息
        'required': true, // 是否必须
        'type': 'char', // 类型 我们可以讨论一下
        'placeholder': '灰色给用户提示语',
        'value': '我是char' // 草稿的时候可以有值
      },
      {
        'field': 'idType',
        'text': '证件类型',
        'errorMessage': '请选择证件',
        'required': true,
        'type': 'select',
        'placeholder': '灰色给用户提示语',
        'value': ['女'], // 对应选项的value
        'options': [[ // 选项的值  这是大美的要求 动态的可选值
          {
            label: '男',
            value: '男1',
          },
          {
            label: '女',
            value: '女1',
          }
        ]]
      },
      {
        'field': 'date',
        'text': '出生日期',
        'errorMessage': '请输入日期',
        'required': true,
        'type': 'date',
        'placeholder': '灰色给用户提示语',
        'value': '2017-10-20'
      },
      //  {
      //   'field': 'username',
      //   'text': '用户名',
      //   'errorMessage': '请输入用户名',
      //   'required': true,
      //   'type': 'char',
      //   'value': 'hello world'
      // }, {
      //   'field': 'customer',
      //   'text': '客户',
      //   'errorMessage': '请输入客户',
      //   'required': true,
      //   'type': 'select',
      //   'value': '中兴',
      //   'options': ['贝尔', '中兴', '烽火']
      // }
    ];

    return (
      <List>
        {
          data.map((v, i) => {

            return (
              <div key={'registerForm' + i}>
                {
                  getFieldDecorator(v.field, {
                    // initialValue: '',
                    rules: [{ required: v.required, message: v.errorMessage }]
                  })(
                    this.switchItem(v)
                  )
                }
              </div>
            )
          })
        }

        {getFieldError(data[2].field)}
      </List>
    )
  }

  // 提交表单
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {
        let formObj = this.props.form.getFieldsValue();
        // formObj.
        console.log('res---', formObj);

      } else {
        // alert('Validation failed');
      }
    });
    // this.onReset();
  }
  reset = () => {
    const form = this.props.form;
    form.resetFields();
  }
  onSaveIdentityDraft = () => {
    this.props.form.setFieldsValue({
      name: 'yang',
      date: util.getStrToDate("1984-04-06"),
      idType: ['女1']
    });
  }
  headerClick = (v, i) => {
    this.setState({
      headerSelect: i
    });
    this.props.dispatch(routerRedux.replace({
      pathname: v.path
    }));
  }

  // 渲染头部
  renderHeader = () => {
    let datas = [
      {
        title: '身份证件',
        path: '/registerForm/identityCard'
      },
      {
        title: '填写信息',
        path: '/registerForm/fillInfo'
      },
      // {
      //   title: '补充材料',
      //   path: '/registerForm/material'
      // },
      {
        title: '确认信息',
        path: '/registerForm/submitInfo'
      },
    ]
    return (
      <div
        className={styles.header}
        ref={ref => this.div = ref}
      >
        {
          datas.map((v, i) => {
            return (
              <div
                key={'regiseterForm' + i}
                onClick={() => this.headerClick(v, i)}
                className={classNames(styles.headerItem, this.state.headerSelect == i ? styles.selectItem : '')}
              >
                <span>{v.title}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  // 渲染 tab 主体
  renderTabBody = (props) => {
    let step = this.props.match.params.step;
    let tempEle = '';
    switch (step) {
      case 'identityCard':
        tempEle = <IdentityCard />;
        break;
      case 'fillInfo':
        tempEle = <FillInfo />;
        break;
      case 'material':
        tempEle = '' && <Material />;
        break;
      case 'submitInfo':
        tempEle = <SubmitInfo />;
        break;
    }
    return (
      <div className={styles.tabBodyBox}>
        {
          tempEle
        }
      </div>
    )
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={styles.container}>
        {/* 头部 */}
        <div className={styles.headerBox}>
          {this.renderHeader()}
        </div>
        {/* tab 主体 */}
        {this.renderTabBody()}

        {/* {this.renderForm()} */}
        {/* 底部按钮 */}
        {/* <div className={styles.submit}>
          <div><Button inline onClick={this.onSubmit}>填写完毕, 提交审核</Button><WhiteSpace /></div>
          <div><Button inline onClick={this.reset}>复原</Button><WhiteSpace /></div>
          <div><Button inline onClick={this.onSaveIdentityDraft}>存稿, 稍后继续</Button></div>
        </div> */}
      </div>
    )
  }
}

RegisterForm.defaultProps = {

};

RegisterForm.propTypes = {

};
function mapStateToProps(state) {
  return {
    companyData: state.company
  }
}

const RegisterFormWrapper = createForm()(RegisterForm);
export default connect(mapStateToProps)(RegisterFormWrapper);
