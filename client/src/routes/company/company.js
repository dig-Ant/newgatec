import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';
import styles from './company.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';

const Item = List.Item;

class Company extends Component {
  constructor() {
    super();
    this.state = {
      selectCarousel: 0
    }
  }

  componentDidMount() {
    // 请求企业数据
    this.props.dispatch({
      type: 'company/getCompanyList'
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.selectCarousel !== nextProps.companyData.selectCarousel) {

    }

  }

  salaryBtn = () => {
    this.props.dispatch({
      type: 'salary/jumpPage',
      payload: 'salaryList'
    })
  }
  welfareBtn = () => {
    this.props.dispatch({
      type: 'salary/jumpPage',
      payload: 'welfareList'
    })
  }

  selectCompany = (v, i) => {
    console.log('v', v);
  }

  // 功能按钮
  featureClick = (v, i) => {
    // 需要路由
    // 跳转到对应的界面
    console.log(v, i);
    console.log(this.props);
    this.props.dispatch(routerRedux.push({
      pathname: '/registerForm',

    }));
  }

  // 渲染公司对应的功能按钮
  renderFeatureList = () => {

    let data = this.props.companyData.featureList;
    console.log(data);
    let tempArr = [];
    data.map((v, i) => {
      tempArr.push((
        <div
          key={'featureList' + i}
          className={styles.item}
          onClick={() => this.featureClick(v, i)}
        >
          <div className={styles.info}>
            <span>{v.name}</span>
          </div>
        </div>
      ));
    });
    return (
      <div className={styles.featureList}>
        {tempArr}
      </div>
    )
  }

  // 轮播图 滑动到当前的坐标
  afterChange = (i) => {
    let companyList = this.props.companyData.companyList;
    console.log('i', i);
    this.props.dispatch({
      type: 'company/changeSelectCarousel',
      payload: i
    });
    if (companyList[i]) {
      this.props.dispatch({
        type: 'company/getCompanyBtnList',
        payload: companyList[i].id
      });
    }
  }
  // 渲染轮播图 公司列表
  renderCarousel = () => {

    return (
      <Carousel
        autoplay={false}
        infinite
        cellSpacing={15}
        slideWidth='280px'
        selectedIndex={this.props.companyData.selectCarousel}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={this.afterChange}
      >
        {this.props.companyData.companyList.map(val => (
          <div
            className={styles.carouselItem}
            key={val}
            href="http://www.alipay.com"
          // style={{ height: this.state.imgHeight }}
          >
            <div className={styles.carouselInfo}>
              <div className={styles.logo}>
                <span>公司logo</span>
              </div>
              <div className={styles.time}>
                <span>2015.7.1-2018.2.28(预计)</span>
              </div>
              <div className={styles.companyName}>
                <span>{val.name}</span>
              </div>
              <div className={styles.cardFoot}>
                <div className={styles.foot}>
                  <div>待办1</div>
                  <div>积分1888</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </Carousel>
    )
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.carouselBox}>
            {this.renderCarousel()}
          </div>
          <div className={styles.featureBox}>
            {this.renderFeatureList()}
          </div>
          {/* header */}
          <div className={styles.welfareBtnBox}>
            <div className={styles.welfareBtn} onClick={this.welfareBtn}>
              <img src={companyImg.welfare} alt="" />
              <p>社保公积金</p>
            </div>
          </div>

          <div className={styles.welfareBtnBox}>
            <div className={styles.salaryBtn} onClick={this.salaryBtn}>
              <img src={companyImg.salary} alt="" />
              <p>工资条</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Company.defaultProps = {

};

Company.propTypes = {

};
function mapStateToProps(state) {
  return {
    companyData: state.company
  }
}

export default connect(mapStateToProps)(Company);
