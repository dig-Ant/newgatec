import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticketFail.less';
import { Button } from 'antd-mobile';
import cfg from 'cfg/cfg';
import ticketImg from '../../assets/ticket';

class TicketFail extends Component {

  constructor() {
    super()
    this.state = {
      multiple: false,
    }
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }

  goBack = () => {
    this.props.dispatch(routerRedux.go(-2));
  }
  render() {
    const ticketInfo = this.props.ticketInfo;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <p>由于该服务请求已经开始处理，我们无法为您在线取消。</p>
          <p>如果您确定需要取消，请直接电话联系我们的服务中心，或在本公众号与我们沟通。</p>
        </div>
        <div className={styles.btnBox}>
          <a href="tel: 4009986281,2"><span>拨打电话</span></a>
          <div
            onClick={this.goBack}
            className={styles.goBack}>
            <span>返回</span>
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    ticketInfo: state.ticket.ticketInfo
  }
}

export default connect(mapStateToProps)(TicketFail);