import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';
import styles from './company.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';
import util from '../../utils/util';

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
    const { name, ...task_id } = v;
    const qs = util.serializeQS(task_id);
    switch (v.name) {
      case 'CFInfoColl':
        this.props.dispatch(routerRedux.push({
          pathname: '/registerForm/identityCard',
          search: '?' + qs
        }));
        break;
    }

  }

  // 渲染公司对应的功能按钮
  renderFeatureList = () => {
    // 员工档案	StaffInfo
    // 社保公积金	SIHF
    // 工资条	Payslips
    // 企业福利	Welfare
    // 保障理赔	Claims
    // 年节礼卡	Giftcards
    // 医疗体检	MedExam
    // 人事服务请求	emprequest
    // 待办事项	todo
    // 自助入职	PreEntry
    // 员工信息收集表	CFInfoColl
    let mapName = {
      StaffInfo: '员工档案',
      SIHF: '社保公积金',
      Payslips: '工资条',
      Welfare: '企业福利',
      Claims: '保障理赔',
      Giftcards: '年节礼卡',
      MedExam: '医疗体检',
      emprequest: '人事服务请求',
      todo: '待办事项',
      PreEntry: '自助入职',
      CFInfoColl: '员工信息收集表',
    }
    let data = this.props.companyData.featureList;
    let tempArr = [];
    data.map((v, i) => {
      tempArr.push((
        <div
          key={'featureList' + i}
          className={styles.item}
          onClick={() => this.featureClick(v, i)}
        >
          <div className={styles.info}>
            <p>{mapName[v.name]}</p>
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
        payload: companyList[i].cst_id
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
        {this.props.companyData.companyList.map((val, i) => (
          <div
            className={styles.carouselItem}
            key={'companylist' + i}
          // href="http://www.alipay.com"
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
                <span>{val.com_name}</span>
              </div>
              <div className={styles.cardFoot}>
                <div className={styles.foot}>
                  <div>代办{val.task_state}</div>
                  <div>积分{val.integral}</div>
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
