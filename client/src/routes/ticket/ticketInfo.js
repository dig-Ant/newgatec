import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticketInfo.less';
import { ImagePicker, Steps, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import cfg from 'cfg/cfg';
import ticketImg from '../../assets/ticket';
import util from 'utils/util';

const Step = Steps.Step;

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
      statusData: [
        {
          // infoShow: true,
          resultShow: false, // 回复
          cancelType: false,  // 取消类型
          btnShow: true,     // 按钮 (取消)
        },
        {
          // infoShow: true,
          resultShow: true,
          cancelType: false,
          btnShow: true, // 按钮 (我知道了)
        },
        {
          // infoShow: true,
          resultShow: true,
          cancelType: false,
          btnShow: false,
        },
        {
          // infoShow: true,
          resultShow: false,
          cancelType: true,
          btnShow: false,
        }
      ],
      currentStatus: {},
      files: data,
      multiple: false,
    }
  }

  componentDidMount() {
    let key = this.props.match.params;
    if (key.tkt_key) {
      this.props.dispatch({
        type: 'ticket/getTkt_detail',
        payload: key
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    let status = nextProps.ticketInfo.tkt.tkt_state_code;
    this.prepare(status);
  }
  prepare = (status) => {
    let currentStatus = {};
    if (status <= 200) {
      currentStatus = this.state.statusData[0];
      console.log('200---', currentStatus);
    } else if (status == 600) {
      currentStatus = this.state.statusData[1];
      console.log('600---', currentStatus);
    } else if (status < 900) {
      currentStatus = this.state.statusData[2];
      console.log('800---', currentStatus);
    } else {
      currentStatus = this.state.statusData[3];
      console.log('900---', currentStatus);
    }
    this.setState({
      currentStatus
    });
  }

  // 图片改变
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  // 渲染处理进度
  renderHandleStep = () => {
    let flow = this.props.ticketInfo.flow;
    let tempArr = [];
    flow.map((v, i) => {
      tempArr.unshift((
        <Step key={'step' + i} title={v.work_order_key} description={util.getDateToStr(v.write_date)} />
      ));
    });
    return (
      <div className={styles.handleStep}>
        <p>处理进度:</p>
        <Steps size="small" current={flow.length - 1 < 0 ? 0 : flow.length - 1}>
          {tempArr}
        </Steps>
      </div>
    )
  }
  // 渲染服务列表
  renderInfo = () => {
    let { currentStatus } = this.state;
    let detailsList = this.props.ticketInfo.details;
    if (detailsList) {
      return (
        <div className={styles.info}>
          {
            detailsList.map((v, i) => {
              return (
                <div key={'infoItem' + i} className={styles.infoItem}>
                  <span>{v.key}</span>
                  <span>{v.value}</span>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
  // 渲染详情描述
  renderQuestionInfo = () => {
    let tkt = this.props.ticketInfo.tkt;
    const { files } = this.state;
    return (
      <div className={styles.questionInfo}>
        <p>详情描述:</p>
        <div className={styles.question}>
          <p className={styles.infoTop}>
            {tkt.des}
          </p>
          <div className={styles.infoDown}>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={false}
              multiple={this.state.multiple}
            />
          </div>
        </div>
      </div>
    )
  }
  // 处理带链接的字符串
  renderHtml = (v, htmlArr) => {
    console.log(v.split('${link}'));
    let tempArr = [];
    let valueArr = v.split('${link}');
    valueArr.map((v, i) => {
      tempArr.push((
        <span key={'renderHtml' + i}>{v}</span>
      ));
      if (i < valueArr.length - 1) {
        tempArr.push((
          <a key={'renderHtml_url' + i} href={htmlArr}>{htmlArr}</a>
        ));
      }
    });
    return tempArr
  }
  // 渲染回复描述
  renderResultInfo = () => {

    let { currentStatus } = this.state;
    if (currentStatus.resultShow) {
      let reply = this.props.ticketInfo.reply;
      let txtInfo = reply.reply_content;
      let htmlArr = reply.reply_url;
      //临时处理拼接字符串
      let tempArr = this.renderHtml(txtInfo, htmlArr);

      const { files } = this.state;

      return (
        <div className={styles.resultInfo}>
          <p>回复描述:</p>
          <div className={styles.result}>
            <p className={styles.infoTop}>
              {tempArr}
            </p>
            <div className={styles.infoDown}>
              <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={false}
              // multiple={this.state.multiple}
              />
            </div>
          </div>
        </div>
      )
    }
  }
  // 渲染取消类型
  renderCancelType = () => {
    let { currentStatus } = this.state;
    let cancel = this.props.ticketInfo.cancel;
    let tkt = this.props.ticketInfo.tkt;
    let v = true;
    if (currentStatus.cancelType) {
      return (
        <div className={styles.cancelType}>
          <div className={styles.top}>
            <span>取消类型</span>
            <span>{tkt.remark}</span>
          </div>
          {cancel.remark ?
            <p className={styles.cancelInfo}>
              {cancel.remark.remark}
            </p>
            : null}
        </div>
      )
    }
  }
  // 撤销按钮
  cancalClick = (a) => {
    this.props.dispatch({
      type: 'ticket/tkt_cancelInfo',
      payload: {
        tkt_key: a.tkt_key
      }
    });
  }
  // 用户点击知道了 
  knowClick = (a) => {
    this.props.dispatch({
      type: 'ticket/getTkt_close_reply',
      payload: {
        tkt_key: a.tkt_key
      }
    });
  }
  // 渲染底部按钮
  renderFootBtn = () => {
    let { currentStatus } = this.state;
    const tkt = this.props.ticketInfo.tkt;
    console.log('currentl', tkt);
    if (currentStatus.btnShow) {
      if (tkt.tkt_state_code == 600) {
        return (
          <div className={styles.footBtn}>
            <Button
              className={styles.btn}
              onClick={() => this.knowClick(tkt)}
              activeStyle={{ backgroundColor: '#ddd' }}
            >我知道了</Button>
          </div>
        )
      } else {
        return (
          <div className={styles.footBtn}>
            <Button
              className={styles.btn}
              onClick={() => this.cancalClick(tkt)}
              activeStyle={{ backgroundColor: '#ddd' }}
            >撤销</Button>
          </div>
        )
      }

    }
  }
  render() {
    const ticketInfo = this.props.ticketInfo;
    return (
      <div className={styles.container}>
        {/* 标题 */}
        <div className={styles.title}>
          <img src={ticketImg['type' + ticketInfo.tkt.field_key]} alt="" />
          <p>{ticketInfo.tkt.subject}</p>
        </div>
        {/* 处理进度 */}
        {this.renderHandleStep()}

        {/*  salary welfare 列表内容  */}
        {this.renderInfo()}

        {/* 详细结果 */}
        {this.renderQuestionInfo()}

        {/* 处理结果 */}
        {this.renderResultInfo()}

        {/* 取消类型 */}
        {this.renderCancelType()}

        {/* 尾部按钮 */}
        {this.renderFootBtn()}

      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    ticketInfo: state.ticket.ticketInfo
  }
}

export default connect(mapStateToProps)(Ticket);