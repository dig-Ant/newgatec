import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, WhiteSpace } from 'antd-mobile';
import styles from './service.less';
import { Route, Switch } from 'dva/router';
import TicketList from '../ticket/ticketList';
import { routerRedux } from 'dva/router';
import util from '../../utils/util';
import cfg from 'cfg/cfg';

class Service extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    // 请求服务列表数据  模型  => ticket
    this.props.dispatch({
      type: 'ticket/getTicketList'
    });
    this.props.dispatch({
      type: 'ticket/getTicketOverList'
    });
  }


  // 置顶
  onTop = (a) => {
    console.log('server-top', a);
    // remark :null
    // sticky:0
    // subject:"薪酬异议"
    // tkt_key:"e3d162f7-962b-4832-b8b6-e203b190b617"
    // tkt_state_code:100
    // tkt_type:1
    // write_date:"2018-07-12T03:12:53.364Z"
    this.props.dispatch({
      type: 'ticket/ticketOnTop',
      payload: {
        tkt_key: a.tkt_key
      }
    });
  }
  // 撤销一条消息
  onCancel = (a) => {
    this.props.dispatch({
      type: 'ticket/tkt_cancel',
      payload: {
        tkt_key: a.tkt_key
      }
    });
  }
  tabOnChange = (tab, index) => {
    console.log('tab9nChange', index, tab);
    // 请求历史
    if (index == 0) {
      this.props.dispatch({
        type: 'ticket/getTicketList'
      });
    } else if (index == 1) {
      this.props.dispatch({
        type: 'ticket/getTicketOverList'
      });
    }

  }
  onTicketInfo = (key) => {
    let obj = { a: 1 };
    this.props.dispatch(routerRedux.push({
      pathname: `/ticketInfo/${key.tkt_key}`,
      query: {
        tkt_key: key.tkt_key
      },
      state: {
        a: 1
      }
    }));
    // this.props.dispatch({
    //   type: 'ticket/getTkt_detail',
    //   payload: {
    //     tkt_key: key.tkt_key
    //   }
    // });
  }
  // 提交新的服务请求 通用服务请求
  onSubmitSer = () => {
    let ticketInfo = JSON.stringify({
      clt_key: 0,
      serverType: 'general'
    });
    util._storage.set_s(cfg.ticket_info, ticketInfo);
    this.props.dispatch(routerRedux.push('/ticket'));
  }
  render() {
    return (
      <div className={styles.container}>
        <Button
          onClick={this.onSubmitSer}
        >提出新的服务请求</Button>

        {/* header */}
        <TicketList
          data={this.props.ticketData.ticketList.data}
          overData={this.props.ticketData.ticketOverList.data}
          onTop={this.onTop}//置顶按钮
          onTicketInfo={this.onTicketInfo}// 详情按钮
          onCancel={this.onCancel}
          tabOnChange={this.tabOnChange}
        />
      </div>
    )
  }
}
Service.defaultProps = {

};

Service.propTypes = {

};
function mapStateToProps(state) {
  return {
    ticketData: state.ticket
  }
}

export default connect(mapStateToProps)(Service);
