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

@connect((state) => {
  return {
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
})

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      tabArr: [
        {
          img: 'robot',
          img_y: 'robot1',
          title: '首页',
          name: 'home',
          path: '/home'
        },
        {
          img: 'company_u',
          img_y: 'company_y',
          title: '企业',
          name: 'company',
          path: '/home/company'
        },
        {
          img: 'guanzhu_u',
          img_y: 'guanzhu_y',
          title: '关注',
          name: 'focus',
          path: '/home/focus' // 无
        },
        {
          img: 'xing_u',
          img_y: 'xing_y',
          title: '服务',
          name: 'service',
          path: '/home/service' // 无
        },
        {
          img: 'my_u',
          img_y: 'my_y',
          title: '我',
          name: 'my',
          path: '/home/my' // 无
        },
        // {
        //   img: 'my_u',
        //   img_y: 'my_y',
        //   title: '英文',
        //   name: 'my',
        //   path: '/home'
        // },
      ],
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    }
  }

  componentDidMount() {
    // 判断用户身份 未激活用户跳转 激活页面
    console.log('this.rpops', this.props)
    switch (this.props.match.params.route) {
      case 'company':
        this.setState({ selectedTab: 'company' });
        break;
      case 'focus':
        this.setState({ selectedTab: 'focus' });
        break;
      case 'service':
        this.setState({ selectedTab: 'service' });
        break;
      case 'my':
        this.setState({ selectedTab: 'my' });
        break;
      default:
        this.setState({ selectedTab: 'home' });
    }
    this.props.dispatch({
      type: 'validUser/getUserLogin'
    });
  }



  // 根据路由渲染对应组件
  renderHomeBody = (v) => {
    switch (v.name) {
      case 'home':
        return <Homepage />
        break;
      case 'company':
        return <Company />
        break;
      case 'focus':
        return <Homepage />
        break;
      case 'service':
        return <Service />
        break;
      case 'my':
        return <Homepage />
        break;
      default: 
        return <Homepage />
    }
  }
  //
  renderTabBarItem = () => {

    let tempArr = [];
    this.state.tabArr.forEach((v, i) => {

      tempArr.push((
        <TabBar.Item
          title={v.title}
          key="Life"
          icon={<img src={home[v.img_y]} alt="" style={{ width: 22, height: 22 }} />}
          selectedIcon={<img src={home[v.img]} alt="" style={{ width: 22, height: 22 }} />}
          selected={this.state.selectedTab === v.name}
          // badge={1}
          onPress={() => {
            this.setState({
              selectedTab: v.name,
            });
            this.props.dispatch(routerRedux.replace(v.path));
          }}
          data-seed="logId"
        >
          {this.renderHomeBody(v)}
        </TabBar.Item>
      ));
    });
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5fefe"
        hidden={this.state.hidden}
        prerenderingSiblingsNumber={0}
      >
        {tempArr}
      </TabBar>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        {this.renderTabBarItem()}
       

      </div>
    )
  }
}
Home.defaultProps = {

};

Home.propTypes = {

};
