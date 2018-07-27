import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { TabBar } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './home.less';
import { Route, Switch } from 'dva/router';
import Homepage from './homepage';
import Company from '../company/company';
import Service from '../servicePage/service';
import home from '../../assets/home';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tabArr: [
        {
          img: 'robot',
          img_y: 'robot1',
          title: '',
          path: '/home'
        },
        {
          img: 'company_u',
          img_y: 'company_y',
          title: '企业',
          path: '/home/company'
        },
        {
          img: 'guanzhu_u',
          img_y: 'guanzhu_y',
          title: '关注',
          path: '/home/focus' // 无
        },
        {
          img: 'xing_u',
          img_y: 'xing_y',
          title: '服务',
          path: '/home/service' // 无
        },
        {
          img: 'my_u',
          img_y: 'my_y',
          title: '我',
          path: '/home/my' // 无
        },
        {
          img: 'my_u',
          img_y: 'my_y',
          title: '英文',
          path: '/home'
        },
      ],
      tabSelect: '',
    }
  }

  componentDidMount() {
    // 判断用户身份 未激活用户跳转 激活页面
    this.props.dispatch({
      type: 'validUser/getUserLogin'
    });
  }

  tabChange = (i, v) => {
    if (this.state.tabSelect !== i) {
      this.setState({
        tabSelect: i
      });
      this.props.dispatch(routerRedux.replace(v));
    }

  }
  renderTab = () => {
    let tabs = [];
    this.state.tabArr.forEach((v, i) => {
      tabs.push((
        <div
          onClick={() => this.tabChange(i, v.path)}
          key={'tab' + i}>
          {this.state.tabSelect == i ? <img src={home[v.img_y]} alt="" /> : <img src={home[v.img]} alt="" />}
          <span style={{ color: this.state.tabSelect == i ? '#000' : '#000' }}>{v.title}</span>
        </div>
      ));
    });
    return (
      <div className={styles.tab}>
        {tabs}
      </div>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        {/* header */}
        <div className={styles.tabBox}>
          {this.renderTab()}

        </div>
        <div className={styles.body}>
          <Switch>
            <Route path='/home' exact component={Homepage} />
            <Route path='/home/service' exact component={Service} />
            <Route path='/home/company' exact component={Company} />
          </Switch>
        </div>
      </div>
    )
  }
}
Home.defaultProps = {

};

Home.propTypes = {

};
function mapStateToProps(state) {
  return {
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
}

export default connect(mapStateToProps)(Home);
