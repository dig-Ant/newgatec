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

const Item = List.Item;


class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      selectCarousel: 0
    }
  }

  componentDidMount() {
    // 请求企业数据
    this.props.dispatch({
      type: 'company/getCompanyList'
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.selectCarousel !== nextProps.companyData.selectCarousel) {

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
        'value': '我是select',
        'options': [[ // 选项的值  这是大美的要求 动态的可选值
          {
            label: '男',
            value: '男',
          },
          {
            label: '女',
            value: '女',
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
    this.props.form.setFieldsValue({ name: 'yang', date: util.getStrToDate("1984-04-06"),date_of_birth: new Date() });
  }
  render() {
    console.log('data1,', new Date('1994-4-6')); 
    console.log('data1,', util.getStrToDate('1994-4-6'));
    const { getFieldProps, getFieldError } = this.props.form;
    const form = this.props.form;
    return (
      <div className={styles.container}>
        {/* 头部 */}
        <div className={styles.title}>
          <span>员工入职信息表1</span>
        </div>
        {this.renderForm()}
        {/* 底部按钮 */}
        <div className={styles.submit}>
          <div><Button inline onClick={this.onSubmit}>填写完毕, 提交审核</Button><WhiteSpace /></div>
          <div><Button inline onClick={this.reset}>复原</Button><WhiteSpace /></div>
          <div><Button inline onClick={this.onSaveIdentityDraft}>存稿, 稍后继续</Button></div>
        </div>
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
