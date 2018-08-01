import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticket.less';
import { ImagePicker, TextareaItem, Button, Toast } from 'antd-mobile';
import cfg from 'cfg/cfg';
import util from '../../utils/util';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class Ticket extends Component {

  constructor() {
    super()
    this.state = {
      serverType: 'general' || 'salary',// salary welfare validIdentity
      labelList: ['薪酬社保', '员工福利', '礼卡兑换', '保障与理赔', '积分有关', '体检预约', 'BUG与建议', '以上都不是'],
      labelValue: ['salary', 'salary1', 'salary2', 'salary3', 'salary4', 'salary5', 'salary6', 'salary7'],
      selectLabel: 'salary',// 当前选择的标签
      textareValue: '',
      textError: false,
      files: data,
      ticket_info: {}, //跳转过来后 携带的除去serverType 的消息
      info: {} // 薪酬和社保公积金的列表信息
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'wxSdk/setConfig'
    });
    this.prepare();
  }
  prepare = () => {
    let ticket_info = util._storage.get_s(cfg.ticket_info);
    if (ticket_info) {
      let { serverType, info, ...data } = ticket_info;
      this.setState({
        serverType: serverType,
        info: info,
        ticket_info: data
      });
    }
  }
  // 渲染头部
  renderTitle = () => {
    let { serverType } = this.state;
    if (serverType == 'general') {
      return (
        <div className={styles.title}>
          <p className={styles.title1}>在这里提交您的服务请求</p>
        </div>
      );
    } else if (serverType == 'salary') {
      return (
        <div className={styles.title}>
          <p>即将为您提交一条有关</p>
          <p>工资条疑义处理的服务请求</p>
        </div>
      )
    } else if (serverType == 'welfare') {
      return (
        <div className={styles.title}>
          <p>即将为您提交一条有关</p>
          <p>社保公积金答疑的服务请求</p>
        </div>
      )
    } else if (serverType == 'validIdentity') {
      return (
        <div className={styles.title}>
          <p>即将为您提交一条有关</p>
          <p>身份验证的服务请求</p>
        </div>
      )
    }
  }
  // 渲染改变部分
  onLabelClick = (i) => {
    let { labelList, labelValue } = this.state;
    if (i == labelList.length - 1) {
      this.setState({
        selectLabel: labelValue[i],
        subject: `用户服务请求`
      });
      return;
    }
    this.setState({
      selectLabel: labelValue[i],
      subject: `有关『${labelList[i]}』的服务请求`
    });
  }

  renderLabel = () => {
    let { serverType } = this.state;
    if (serverType == 'general') {
      let labelArr = [];
      let { labelList, labelValue } = this.state;
      labelList.forEach((v, i) => {
        labelArr.push((
          <Button
            key={'label' + i}
            onClick={() => this.onLabelClick(i)}
            className={styles.labelBtn}
            style={{
              backgroundColor: this.state.selectLabel == labelValue[i] ? '#73d7dc' : '#fff',
              color: this.state.selectLabel == labelValue[i] ? '#fff' : '#666'
            }}
            // size='small'
            inline
          // activeStyle={{ backgroundColor: '#73d7dc' }}
          >{v}</Button>
        ));
      });
      return (
        <div className={styles.labelBox}>
          <p>请问您需要有关什么方面的帮助?请选择类型</p>
          <div className={styles.labelInfo}>
            {labelArr}
          </div>
        </div>
      )
    } else if (serverType == 'salary' || serverType == 'welfare' || serverType == 'validIdentity') {
      let info = this.state.info;
      let datas = {
        salary: [
          { title: '薪酬期间', value: `${info.year}年${info.month}月` },
          { title: '收入类型', value: info.pay_type },
        ],
        welfare: [
          { title: '账单年月', value: `${info.payment_year}年${info.payment_month}月` },
          { title: '缴费年月', value: `${info.ins_year}年${info.ins_month}月` },
          { title: '缴纳类型', value: info.si_hf_status == 0 ? '补缴' : '正常缴纳' },
        ],
        validIdentity: [
          { title: '证件姓名', value: `${info.name}` },
          { title: '证件类型', value: `${info.id_type}` },
          { title: '证件号码', value: `${info.id_number}` },
          { title: '提交原因', value: info.cause },
        ]
      }
      let data = datas[serverType];
      let tempArr = [];
      data.forEach((v, i) => {
        tempArr.push((
          <div key={'salary' + i} className={styles.labelList}>
            <div>{v.title}</div>
            <div>{v.value}</div>
          </div>
        ));
      });

      return (
        <div className={styles.labelBox}>
          {tempArr}
        </div>
      )
    }
  }
  textareChange = (i) => {
    this.setState({
      textareValue: i
    });

  }
  // 富文本字数限制
  onTextBlur = () => {
    if (this.state.textareValue.trim().length < 10) {
      this.setState({
        textError: true
      })
    } else {
      this.setState({
        textError: false
      })
    }

  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  // 添加图片
  onAddImageClick = (e) => {

    e.preventDefault();
    // this.setState({
    //   files: this.state.files.concat({
    //     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    //     id: '3',
    //   }),
    // });

    let _this = this;
    let src = '';
    window.wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是远图还是压缩图, 默认两者都有
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localId;
        // {localData: data:image/jgp;base64/,/9j/.....} ios
        // {localData: /9j/} android
        var localData = res.localData;
        if (window.__wxjs_is_wkwebview) {
          localData = localData.replace('jpg', 'jpeg');
        } else {
          localData = 'data:image/jpeg;base64,' + localData;
        }
        // alert(localData);
      }
    });
  };
  // 提交
  onSubmit = (i) => {
    let textValue = this.state.textareValue.trim();

    if (textValue.trim().length < 10) {
      return Toast.fail('至少输入10个字的详情哦!', 2);
    }
    // this.props.dispatch(routerRedux.push('/ticketRes'));
    let { serverType } = this.state;
    let requestObj = {};
    if (serverType == 'salary') {
      requestObj = {
        des: textValue,
        ...this.state.ticket_info
      }
    } else if (serverType == 'welfare') {
      requestObj = {
        des: textValue,
        ...this.state.ticket_info
      }
    } else if (serverType == 'general') {
      requestObj = {
        des: textValue,
        subject: this.state.subject,
        ...this.state.ticket_info
      }
    } else if (serverType == 'validIdentity') {
      requestObj = {
        des: textValue,
        ...this.state.ticket_info
      }
    }
    this.props.dispatch({
      type: 'ticket/ticketSubmit',
      payload: requestObj
    });
  }
  render() {
    return (
      <div className={styles.container}>
        {/* title */}
        {this.renderTitle()}
        {/* 标签 */}
        {this.renderLabel()}
        {/* 详细说明 */}
        <div className={styles.textBox}>
          <div>
            <p>请详细说明:</p>
            <p>(10-100个字)</p>
          </div>
          <TextareaItem
            value={this.state.textareValue}
            onChange={this.textareChange}
            rows={4}
            count={100}
            error={this.state.textError}
            onBlur={this.onTextBlur}
            style={{ backgroundColor: "#f7f7f7" }}
          />
        </div>
        {/* 图片添加 */}
        <div className={styles.imgBox}>
          <p>添加图片:</p>
          <ImagePicker
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 3}
            onAddImageClick={this.onAddImageClick}
          />
        </div>
        {/* 提交 */}
        <div className={styles.submit}>
          <Button
            className={styles.submitBtn}
            onClick={this.onSubmit}
            activeStyle={{ backgroundColor: '#ddd' }}
          >填写完毕, 我要提交.</Button>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    ticketData: state.ticket
  }
}

export default connect(mapStateToProps)(Ticket);