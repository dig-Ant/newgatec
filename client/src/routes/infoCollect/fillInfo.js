import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List, InputItem, DatePicker, TextareaItem, Modal, ImagePicker } from 'antd-mobile';
import styles from './fillInfo.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';
import util from '../../utils/util';
import classNames from 'classnames';
import CompanyImg from '../../assets/company';
import city from '../../common/city';//城市
import folkList from '../../common/folk';//民族
import bank from '../../common/bank';//银行
import nation from '../../common/nationality';//银行


const alert = Modal.alert;

const Item = List.Item;

// 户籍信息
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
//工资卡及个税信息 银行卡识别
const data_PCPIT = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];
// 用退工
const data_ESCert = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];


class IdentityCard extends Component {
  constructor() {
    super();
    this.state = {
      groupList: [
        {
          groupName: "基本信息",
          groupType: 'BasicInfo',
        },
        {
          groupName: '联系方式',
          groupType: 'CTCTInfo',
        },
        {
          groupName: '户籍信息',
          groupType: 'HukouInfo',
        },
        {
          groupName: '社保档案',
          groupType: 'SI_Acct',
        },
        {
          groupName: '公积金档案',
          groupType: 'HF_Acct',
        },
        {
          groupName: "工资卡及个税信息",
          groupType: 'PCPIT',
        },
        {
          groupName: '用退工信息',
          groupType: 'ESCert',
        },
      ],
      cardType: 'more' && 'id_card',
      files: data,
      files_PCPIT: data_PCPIT,
      files_ESCert: data_ESCert,
      siAccountState: true,//控制社保账号的显示的隐藏
      hfAccountState: {
        required: false,
        readOnly: true
      },//控制公积金的状态
    }
  }

  componentDidMount() {
    // 查询证件信息
    let queryString = util.getQSJson();
    if (queryString.task_id) {
      this.props.dispatch({
        type: 'company/get_collect_mod',
        payload: queryString.task_id
      });
    }
    this.props.dispatch({
      type: 'company/changeHeaderSelect',
      payload: 1
    });

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.formList !== nextProps.companyData.formList) {
      let formList = nextProps.companyData.formList;
      // 输入草稿
      // this.setIdCardListInfo(formList);
    }

    if (this.props.companyData.draftForm !== nextProps.companyData.draftForm) {
      let draftForm = nextProps.companyData.draftForm;
      console.log('draftForm----', draftForm);
      // 输入草稿
      this.setIdCardListInfo(draftForm);
    }
  }

  inputOnchange = (v, field) => {
    const { getFieldProps, getFieldError } = this.props.form;
    v = v.trim();
    console.log(v);
    return v;
  }
  // nation 类型change 
  onNationChange = (value, item) => {
    console.log('3,v', value, item);
    if (item.field == 'nationality') {

    }
  }
  // 根据后台返回的 data 中 type 类型生成不同的组件
  switchItem(item) {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
    let { certificateInfo } = this.props.companyData;
    if (certificateInfo.state == 1) {
      item.required = false;
    }
    const type = item.type;
    switch (type) {
      case 'int':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          // // placeholder={item.placeholder}
          style={{ width: '100%' }}
          type={'number'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'tel':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          // // placeholder={item.placeholder}
          style={{ width: '100%' }}
          type={'phone'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'email':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          // // placeholder={item.placeholder}
          style={{ width: '100%' }}
          type={'email'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'char':
        return <InputItem
          clear
          error={!!getFieldError(item.field)}
          // // placeholder={item.placeholder}
          style={{ width: '100%' }}
          // onChange={(v) => this.inputOnchange(v, item.field)}
          // type={'number'}
          disabled={!!item.readOnly}
        >{item.text}</InputItem>;
        break;
      case 'textarea':
        return <TextareaItem
          title={item.text}
          clear
          error={!!getFieldError(item.field)}
          // // placeholder={item.placeholder}
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
          extra="请选择(必选)"
        >
          <Item arrow="horizontal">{item.text}</Item>
        </DatePicker>
        break;
      case 'address':
        return (
          <Picker
            data={city}
            // title={item.placeholder}
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
        break;
      case 'folk':
        return (
          <Picker
            data={folkList}
            // title={item.placeholder}
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
        break;
      case 'nation':
        return (
          <Picker
            data={nation}
            // title={item.placeholder}
            cascade={false}
            disabled={!!item.readOnly}
            extra="请选择(必选)"
            onChange={(value) => this.onNationChange(value, item)}
          >
            {/* {
              item.options.map((option, index) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            } */}
            <Item arrow="horizontal">{item.text}</Item>
          </Picker>
        )
        break;
      case 'select':
        return (
          <Picker
            data={item.options}
            // title={item.placeholder}
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
        break;

      // case 'submitImg':
      //   return (
      //     <div className={styles.imgItem}>
      //       <div className={styles.title}>
      //         <span>{item.text}</span>
      //       </div>
      //       <div>
      //         <ImagePicker
      //           length="2"
      //           files={this.state.files}
      //           onChange={this.onChange}
      //           onImageClick={(index, fs) => console.log(index, fs)}
      //           selectable={this.state.files.length < 2}
      //           onAddImageClick={this.onAddImageClick}
      //         />
      //       </div>
      //     </div>
      //   )
      //   break;
      case 'aiSubmitImg': // 银行ai识别
        return (
          <div className={styles.imgItem}>
            <div>
              <span>{item.text}</span>
            </div>
            <div>
              <ImagePicker
                length="2"
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 2}
                onAddImageClick={this.onAddImageClick}
              />
            </div>
          </div>
        )
        break;
      default:
        // return <Input />;
        break;
    }
  }

  // 渲染身份证具体列表
  renderCardList = (data) => {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;

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
          data.map((v, i) => {
            if (v.type == 'date') {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>
                  {
                    getFieldDecorator(v.field, {
                      // initialValue: new Date(v.value),
                      rules: [{ required: v.required, message: v.errorMessage }],
                      // onChange(v, b) {
                      //   console.log('000000123',v, b);
                      // },
                    })(
                      this.switchItem(v)
                    )
                  }
                </div>
              )
            } else if (v.type == 'submitImg') {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>
                  <div className={styles.imgItem}>
                    <div className={styles.title}>
                      <span>{v.text}</span>
                    </div>
                    <div>
                      <ImagePicker
                        length="2"
                        files={this.state.files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.files.length < 2}
                        onAddImageClick={this.onAddImageClick}
                      />
                    </div>
                  </div>
                </div>
              )
            } else if (v.type == 'email') {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>

                  {
                    getFieldDecorator(v.field, {
                      // initialValue: v.value,
                      rules: [
                        { required: v.required, message: v.errorMessage },
                        { type: 'email', message: '不是个邮箱' }
                      ],
                    })(
                      this.switchItem(v)
                    )
                  }
                </div>
              )
            } else {
              return (
                <div className={styles.listItem} key={'identityIdCard' + i}>

                  {
                    getFieldDecorator(v.field, {
                      // initialValue: v.value,
                      rules: [
                        { required: v.required, message: v.errorMessage }
                      ],
                    })(
                      this.switchItem(v)
                    )
                  }
                </div>
              )
            }

          })

        }
        {/* </div> */}
      </List>

    )
  }



  //重置按钮
  reset = () => {
    const form = this.props.form;
    form.resetFields();
  }


  // 提交验证
  onSaveIdentityDraft = (cardType) => {
    const { getFieldProps, getFieldsError } = this.props.form;
    console.log('gerror--', getFieldsError(['is_hf_account']));
    this.props.form.validateFields({ force: true }, (error, res) => {
      if (!error) {
        let queryString = util.getQSJson();

        let formObj = this.props.form.getFieldsValue();
        // formObj.
        let newForm = this.handleFormFormat(formObj, true);
        console.log('newForm- --', newForm);
        // console.log('formObj------', formObj);
        if (queryString.task_id) {
          this.props.dispatch({
            type: 'company/save_collect_draft',
            payload: {
              ...newForm,
              task_id: queryString.task_id
            }
          });
        }

      } else {
        let errArr = [];
        for (let i in error) {
          errArr.push(error[i].errors[0].message);
        }
        console.log('eerrrarr', errArr);
        alert('请填写必填的选项:', errArr.join(','));
      }
    });
  }
  // 处理自动获取表单的格式 : 时间等
  handleFormFormat = (obj, type) => {

    // 表单 => 后台
    if (type == true) {
      // 转化为 select
      let arr1 = ['gender', 'nationality', 'folk', 'marriage_status', 'hukou_type', 'is_si_account', 'is_hf_account', 'bank_name'];
      // 转化为 select 2级联动
      let arr2 = ['living_city', 'hukou_city', 'si_city_id', 'hf_city_id', 'sub_city',];
      // 转化为时间
      let arr3 = ['date_of_birth'];

      function timeToStr(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            obj[v] = +obj[v];
          }
        });
        return obj;
      }
      // 转化格式为 select
      function arrToStr(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            obj[v] = obj[v][0];
          }
        });
        return obj;
      }
      // 转化格式为 select 二级地区联动
      function addressFormatToStr(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            if (obj[v]) {
              obj[v] = obj[v][1];
            }
          }
        });
        return obj
      }
      obj = arrToStr(obj, arr1);
      obj = addressFormatToStr(obj, arr2);
      obj = timeToStr(obj, arr3);

    } else { // 后台 => 表单数据

      // 转化为 select
      let arr1 = ['gender', 'nationality', 'folk', 'marriage_status', 'hukou_type', 'is_si_account', 'is_hf_account', 'bank_name'];
      // 转化为 select 2级联动
      let arr2 = ['living_city', 'hukou_city', 'si_city_id', 'hf_city_id', 'sub_city',];
      // 转化为时间
      let arr3 = ['date_of_birth'];
      // 转化格式为 select
      function strToTime(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            obj[v] = new Date(obj[v]);
          }
        });
        return obj;
      }
      // 转化格式为 select
      function strToArr(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            obj[v] = [obj[v]];
          }
        });
        return obj;
      }
      // 转化格式为 select 二级地区联动
      function strToAddressFormat(obj, arr) {
        arr.forEach(v => {
          if (obj[v]) {
            let province = obj[v].slice(0, 2) + '0000';
            obj[v] = [province, obj[v]];
          }
        });
        return obj
      }
      obj = strToArr(obj, arr1);
      obj = strToAddressFormat(obj, arr2);
      obj = strToTime(obj, arr3);

    }
    return obj;
  }
  // 设置idcard 表单的值
  setIdCardListInfo = (obj) => {
    console.log('obj---', obj);
    let {
      hukou_img_list,
      bank_img_list,
      rework_img_list,
      id_number,
      id_address,
      issuance,
      start_date,
      end_date,
      img_id_front,
      img_id_back,
      c_img_id_list,
      origin_id_card,//原国籍身份证、原国籍姓名
      origin_name,
      task_id,
      ...newObj } = obj;
    // 转化格式
    newObj = this.handleFormFormat(newObj);
    this.props.form.setFieldsValue(newObj);
  }


  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  onChange_PCPIT = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files_PCPIT: files,
    });
  };
  onChange_ESCert = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files_ESCert: files,
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
  onAddImageClick_PCPIT = (e) => {
    e.preventDefault();
    this.setState({
      files_PCPIT: this.state.files_PCPIT.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  };
  onAddImageClick_ESCert = (e) => {
    e.preventDefault();
    this.setState({
      files_ESCert: this.state.files_ESCert.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  };

  //渲染社保档案
  renderSIAcct = (data) => {
    const { getFieldProps, getFieldError } = this.props.form;
    let _this = this;
    let draftForm = this.props.companyData.draftForm;
    return (
      <List className={styles.idCardList}>

        <Picker
          data={city}
          title={"请选择缴纳城市"}
          disabled={!!data[0].readOnly}
          extra="请选择(必选)"
          {...getFieldProps(data[0].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[0].required, message: data[0].errorMessage }],
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">{data[0].text}</Item>
        </Picker>
        <Picker
          data={
            [[
              {
                label: '已有账号', // 选项名 
                value: 1, // 选项对应值 英文
              },
              {
                label: '没有,需要新办',
                value: 0,
              }
            ]]
          }
          title={""}
          cascade={false}
          disabled={!!data[1].readOnly}
          extra="请选择(必选)"
          {...getFieldProps(data[1].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[1].required, message: data[1].errorMessage }],
            onChange(v, b) {
              // 是上海 选择是  只读
              // 不是上海 选择是  随意填写
              // 其他情况 不让填写
              if (v[0] == 1 && draftForm.si_city_id == '310100') {
                //改变只读状态 默认只读  已有时改为只读填写身份证
                //siAccountState true 只读
                _this.setState({
                  siAccountState: true
                });
                let si_account = draftForm.si_account;
                _this.setIdCardListInfo({ si_account });
              } else if (v[0] == 1 && draftForm.si_city_id != '310100') {
                _this.setState({
                  siAccountState: false
                });
                let si_account = '';
                _this.setIdCardListInfo({ si_account });
              } else {
                _this.setState({
                  siAccountState: true
                });
                let si_account = '';
                _this.setIdCardListInfo({ si_account });
              }

            },
          })} >
          <Item arrow="horizontal">{data[1].text}</Item>
        </Picker>
        <InputItem
          {...getFieldProps(data[2].field, {
            // initialValue: formData.name,
            rules: [{ required: data[2].required, message: data[2].errorMessage }],
          })}
          clear
          disabled={!!this.state.siAccountState}
          error={!!getFieldError(data[2].field)}
        // placeholder="请输入社保账号"
        >{data[2].text}</InputItem>
      </List>
    )
  }

  // 渲染公积金档案
  renderHFAcct = (data) => {
    const { getFieldProps, getFieldError } = this.props.form;
    let _this = this;
    let draftForm = this.props.companyData.draftForm;
    return (
      <List className={styles.idCardList}>
        <Picker
          data={city}
          title={"请选择缴纳城市"}
          disabled={!!data[0].readOnly}
          extra="请选择(必选)"
          {...getFieldProps(data[0].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[0].required, message: data[0].errorMessage }],
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">{data[0].text}</Item>
        </Picker>
        <Picker
          data={
            [[
              {
                label: '已有账号',
                value: 1,
              },
              {
                label: '没有,需要新办',
                value: 0,
              }
            ]]
          }
          title={""}
          cascade={false}
          disabled={!!data[1].readOnly}
          extra="请选择(必选)"
          {...getFieldProps(data[1].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[1].required, message: data[1].errorMessage }],
            onChange(v, b) {
              console.log(v, b);

              // 是上海 选择是  必填
              // 不是上海 选择是  随意填写
              // 其他情况 不让填写
              if (v[0] == 1 && draftForm.hf_city_id == '310100') {
                //改变只读状态 默认只读  已有时改为只读填写身份证
                //hfAccountState true 只读
                _this.setState({
                  hfAccountState: {
                    required: true,
                    readOnly: false// 只读
                  }
                });
              } else if (v[0] == 1 && draftForm.hf_city_id != '310100') {
                _this.setState({
                  hfAccountState: {
                    required: false,
                    readOnly: false
                  }
                });
              } else {
                _this.setState({
                  hfAccountState: {
                    required: false,
                    readOnly: true
                  }
                });
              }
            },
          })} >
          <Item arrow="horizontal">{data[1].text}</Item>
        </Picker>
        <InputItem
          {...getFieldProps(data[2].field, {
            // initialValue: formData.name,
            rules: [{ required: this.state.hfAccountState.required, message: data[2].errorMessage }],
          })}
          clear
          disabled={!!this.state.hfAccountState.readOnly}
          error={!!getFieldError(data[2].field)}
        // placeholder="请输入基本公积金账号"
        >{data[2].text}</InputItem>
        {
          data[3].isShow ?
            <InputItem
              {...getFieldProps(data[3].field, {
                // initialValue: formData.name,
                rules: [{ required: this.state.hfAccountState.required, message: data[3].errorMessage }],
              })}
              clear
              disabled={!!this.state.hfAccountState.readOnly}
              error={!!getFieldError(data[3].field)}
            // placeholder="请输入补充公积金账号"
            >{data[3].text}</InputItem> : null
        }
      </List>
    )
  }

  // 工资卡及个税信息
  renderPCPIT = (data) => {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <List className={styles.idCardList}>
        <div className={styles.pcpitImg}>
          <div><span>{data[0].text}</span></div>
          <div>
            <ImagePicker //bank_img_list
              length="2"
              files={this.state.files_PCPIT}
              onChange={this.onChange_PCPIT}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files_PCPIT.length < 1}
              onAddImageClick={this.onAddImageClick_PCPIT}
            />
          </div>
        </div>
        <InputItem
          {...getFieldProps(data[1].field, {
            // initialValue: formData.name,
            rules: [{ required: data[1].required, message: data[1].errorMessage }],
            onChange(v) {
              // 国籍 = 中国大陆 自动带入姓名 不可更改
              // if () {

              // } 
            }
          })}
          clear
          disabled={!!data[1].readOnly}
          error={!!getFieldError(data[1].field)}
        // placeholder="请输入基本公积金账号"
        >{data[1].text}</InputItem>
        <InputItem
          {...getFieldProps(data[2].field, {
            // initialValue: formData.name,
            rules: [{ required: data[2].required, message: data[2].errorMessage }],
          })}
          clear
          disabled={!!data[2].readOnly}
          error={!!getFieldError(data[2].field)}
        // placeholder="请输入基本公积金账号"
        >{data[2].text}</InputItem>
        <Picker
          data={bank}
          title={"请选择银行"}
          cascade={false}
          disabled={!!data[3].readOnly}
          extra="请选择(必选)"
          {...getFieldProps(data[3].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[3].required, message: data[3].errorMessage }],
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">{data[3].text}</Item>
        </Picker>
        <Picker
          data={city}
          title={"请选择缴纳城市"}
          disabled={!!data[4].readOnly}
          extra="请选择(必选)"
          onOk={e => console.log('ok', e)}
          {...getFieldProps(data[4].field, {
            // initialValue: formData.gender,
            rules: [{ required: data[4].required, message: data[4].errorMessage }],
            onChange(v, b) {
              console.log(v, b);
            },
          })} >
          <Item arrow="horizontal">{data[4].text}</Item>
        </Picker>

        <InputItem
          {...getFieldProps(data[5].field, {
            // initialValue: formData.name,
            rules: [{ required: data[5].required, message: data[5].errorMessage }],
          })}
          clear
          disabled={!!data[5].readOnly}
          error={!!getFieldError(data[5].field)}
        // placeholder="请输入基本公积金账号"
        >{data[5].text}</InputItem>
        <InputItem
          {...getFieldProps(data[6].field, {
            // initialValue: formData.name,
            rules: [{ required: data[6].required, message: data[6].errorMessage }],
          })}
          clear
          disabled={!!data[6].readOnly}
          error={!!getFieldError(data[6].field)}
        // placeholder="请输入基本公积金账号"
        >{data[6].text}</InputItem>
      </List>
    )
  }

  // 用退工信息
  renderESCert = (data) => {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={styles.pcpitImg}>
        <div><span>{data[0].text}</span></div>
        <div>
          <ImagePicker //bank_img_list
            length="2"
            files={this.state.files_ESCert}
            onChange={this.onChange_ESCert}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files_ESCert.length < 1}
            onAddImageClick={this.onAddImageClick_ESCert}
          />
        </div>
      </div>
    )
  }
  //onGoback 返回身份验证 返回上一步
  onGoback = () => {
    let qs = util.getQSJson();
    this.props.dispatch(routerRedux.push({
      pathname: '/registerForm/identityCard',
      search: `task_id=${qs.task_id}&id_type=${qs.id_type}&state=goback`
    }));
  }
  // 渲染主体
  renderCardBody = () => {
    let { certificateInfo } = this.props.companyData;
    // 单独创建名族类型 根据类型进行判断 folk
    // 基本信息 BasicInfo
    // 联系方式 CTCTInfo
    // 户籍信息 HukouInfo
    // 社保档案 SI_Acct
    // 公积金档案 HF_Acct
    // 工资卡及个税信息 PCPIT
    // 用退工信息 ESCert
    let formList = this.props.companyData.formList;
    let tempArr = [];
    formList.map((v, i) => {
      if (v.groupType == 'SI_Acct') {
        tempArr.push((
          <div key={'fillinfoCard' + i} className={styles.fieldBox}>
            {/* 标题 */}
            <div className={styles.title}>
              <p>{v.groupName}</p>
            </div>
            {/* 主体 */}
            <div className={styles.cardInfo}>
              {this.renderSIAcct(v.data)}
            </div>
          </div>
        ))
      } else if (v.groupType == 'HF_Acct') {
        tempArr.push((
          <div key={'fillinfoCard' + i} className={styles.fieldBox}>
            {/* 标题 */}
            <div className={styles.title}>
              <p>{v.groupName}</p>
            </div>
            {/* 主体 */}
            <div className={styles.cardInfo}>
              {this.renderHFAcct(v.data)}
            </div>
          </div>
        ))
      } else if (v.groupType == 'PCPIT') {
        tempArr.push((
          <div key={'fillinfoCard' + i} className={styles.fieldBox}>
            {/* 标题 */}
            <div className={styles.title}>
              <p>{v.groupName}</p>
            </div>
            {/* 主体 */}
            <div className={styles.cardInfo}>
              {this.renderPCPIT(v.data)}
            </div>
          </div>
        ))
      } else if (v.groupType == 'ESCert') {
        tempArr.push((
          <div key={'fillinfoCard' + i} className={styles.fieldBox}>
            {/* 标题 */}
            <div className={styles.title}>
              <p>{v.groupName}</p>
            </div>
            {/* 主体 */}
            <div className={styles.cardInfo}>
              {this.renderESCert(v.data)}
            </div>
          </div>
        ))
      } else {
        tempArr.push((
          <div key={'fillinfoCard' + i} className={styles.fieldBox}>
            {/* 标题 */}
            <div className={styles.title}>
              <p>{v.groupName}</p>
            </div>
            {/* 主体 */}
            <div className={styles.cardInfo}>
              {this.renderCardList(v.data)}
            </div>
          </div>
        ));
      }

    });
    return (
      <div className={styles.cardBox}>
        {tempArr}
        <div className={styles.submitBox}>
          <div>
            <Button
              style={{ backgroundColor: 'rgba(151, 217, 213, 1)' }}
              activeStyle={{ backgroundColor: '#ddd' }}
              onClick={() => this.onSaveIdentityDraft('id_card')}>保存草稿,并进行下一步</Button>
          </div>
          <div>
            <Button
              style={{ backgroundColor: '#ccc' }}
              activeStyle={{ backgroundColor: '#ddd' }}
              onClick={this.onGoback}
            >返回上一步</Button>
          </div>
        </div>

      </div>
    )

  }
  render() {


    return (
      <div className={styles.container}>
        {/* 渲染表单 */}
        {this.renderCardBody()}
        <List>
          <DatePicker
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal" >预计使用时间</List.Item>
          </DatePicker>
        </List>
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
