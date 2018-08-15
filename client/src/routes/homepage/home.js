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
      tabSelect: '',
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
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
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  renderTabBarItem = () => {
    let obj = {
      img: 'xing_u',
      img_y: 'xing_y',
      title: '服务',
      path: '/home/service' // 无
    };
    let tempArr = [];
    this.state.tabArr.forEach((v, i) => {
      let component = '';
      if(v.path == '/home') {
        component = Homepage
      } else if (v.path == '/home/company') {
        component = Company
      } else if (v.path == '/home/focus') {
        component = Service
      } else if (v.path == '/home/service') {
        component = Service
      } else if (v.path == '/home/my') {
        component = Service
      }
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
          <Route path={v.path} exact component={component} />
          {/* {this.renderContent('Life')} */}
        </TabBar.Item>
      ));
    });
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5fefe"
        hidden={this.state.hidden}
      >
        {tempArr}
      </TabBar>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        {this.renderTabBarItem()}
        {/* <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <Route path='/home' exact component={Homepage} />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
              this.props.dispatch(routerRedux.replace('/home/company'));
            }}
            data-seed="logId1"
          >
            <Route path='/home/company' exact component={Company} />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="My"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar> */}
        {/* header */}
        {/* <div className={styles.tabBox}>
          {this.renderTab()}

        </div>
        <div className={styles.body}>
          <Switch>
            <Route path='/home' exact component={Homepage} />
            <Route path='/home/service' exact component={Service} />
            <Route path='/home/company' exact component={Company} />
          </Switch>
        </div> */}
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

// export default connect(mapStateToProps)(Home);
