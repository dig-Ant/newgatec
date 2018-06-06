
import React from 'react';
import propTypes from 'prop-types';
import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './NoticeBars.less';

class NoticeBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: []
    };
  }

  onClickNotice = () => {
    let type = this.props.type;
    if (this.props.onClick) {
      return this.props.onClick();
    }
    if (type == 1) {
      this.props.dispatch(routerRedux.push('/identityVerify'));
    } 
    
  }

  renderNoticeBar = () => {
    let mode = '';
    let message = '';
    let action = '';
    let type = this.props.type;
    let types = [
      {
        mode: null,
        message: null,
        action: null
      }, {
        mode: 'link',
        message: '需要您进行身份验证',
        action: '现在就去'
      }, {
        mode: null,
        message: '身份验证审核中,部分功能不使用,请耐心等待',
        action: null
      }, {
        mode: 'closable',
        message: '身份验证已通过',
        action: '我知道了'
      }
    ]
    //state:返回状态0:不需要，1：需要未验证，2:正在验证，3:已经验证，
    if (type != 0) {
      mode = types[type].mode;
      action = types[type].action;
      message = types[type].message;
    } else {
      return null;
    }

    return (
      <div>
        <div className={styles.blank}></div>
        <NoticeBar
          mode={mode}
          onClick={this.onClickNotice}
          action={<span style={{ color: '#a1a1a1' }}>{action}</span>}
          marqueeProps={{ loop: true, leading: 1000, trailing: 1000, fps: 40, style: { padding: '0 7.5px' } }}>
          {message}
        </NoticeBar>

      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderNoticeBar()}
      </div>
    );
  }
}
NoticeBars.defaultProps = {
  mode: 'link',
  action: '现在就去',
  message: '需要您进行身份验证',
  type: 1
};
NoticeBars.propTypes = {
  data: propTypes.array
};

export default connect()(NoticeBars);
