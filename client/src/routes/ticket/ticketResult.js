import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticketResult.less';
import { ImagePicker, TextareaItem, Button, Icon } from 'antd-mobile';


class TicketResult extends Component {

  constructor() {
    super()
    this.state = {
      serverType: 'salary' || 'general',// salary welfare
    }
  }
  resultBtn = () => {
    this.props.dispatch(routerRedux.replace('/home/service'));
  }
  render() {

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Icon
            style={{ width: 140, height: 140 }}
            type="check-circle-o"
            color='#ccc'
          />
          <div>提交成功</div>
        </div>
        <div className={styles.info}>
          我们将安排您的专属服务经理，尽快处理。
        </div>
        <div className={styles.btn}>
          <Button
            onClick={this.resultBtn}
            className={styles.resultBtn}
            activeStyle={{ backgroundColor: '#ddd' }}
          >好的, 我知道了</Button>
        </div>
        {/* 请求编号 */}
        <div className={styles.foot}>
          <p>本次服务请求的编号:</p>
          <p>{this.props.ticketData.requestNum}</p>
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

export default connect(mapStateToProps)(TicketResult);