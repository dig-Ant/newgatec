import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, Carousel, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import NoticeBars from 'components/NoticeBars';
import cfg from '../../config/cfg';
import styles from './homepage.less';
import { homepage } from '../../assets';
import { Router, Route, Switch } from 'dva/router';
import TicketList from '../ticket/ticketList';
class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      data: [homepage.carousel1, homepage.carousel2, homepage.carousel3],
      imgHeight: 176,
    }
  }

  componentDidMount() {
    // 是否需要身份验证
    this.props.dispatch({
      type: 'validUser/getIsVerifyUser'
    });
    // setTimeout(() => {
    //   this.setState({
    //     data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    //   });
    // }, 100);
  }

  onActivation() {
    this.props.dispatch(routerRedux.push('/active'));
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
  serverRequest = () => {
    this.props.dispatch(routerRedux.push('/ticket'));
  }
  clear = () => {
    window.localStorage.removeItem(cfg.access_token);
  }

  render() {
    return (
      <div className={styles.container}>
        <NoticeBars type={ this.props.noticeData} />
        <WingBlank>
          <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={10}
            slideWidth={0.8}
            autoplay
            infinite
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => this.setState({ slideIndex: index })}
          >
            {this.state.data.map((val, index) => {
              return (
                <a
                  key={val}
                  href="javascript:void(0)"
                  style={{
                    display: 'block',
                    position: 'relative',
                    top: this.state.slideIndex === index ? -10 : 0,
                    height: this.state.imgHeight,
                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <img
                    src={val}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              )
            }
            )}
          </Carousel>
        </WingBlank>
        <h2>{this.props.data}</h2>
        <Button
          onClick={this.onActivation.bind(this)}
        >点击激活账号</Button><WhiteSpace />
        {/* <Button
          onClick={this.salaryBtn}
        >薪资查询</Button><WhiteSpace /><WhiteSpace />
        <Button
          onClick={this.welfareBtn}
        >社保公积金</Button><WhiteSpace /><WhiteSpace /> */}
        <Button
          onClick={this.serverRequest}
        >服务请求快捷入口(测试用)</Button><WhiteSpace />
        <Button
          onClick={this.clear}
        >清理本地存储</Button>
        <p style={{ textAlign: 'center' }}>点击此按钮 相当于退出,误点 测试用</p>

      </div>
    )
  }
}
Homepage.defaultProps = {

};

Homepage.propTypes = {

};
function mapStateToProps(state) {
  return {
    noticeData: state.validUser.noticeData,
    data: state.homepage.data
  }
}

export default connect(mapStateToProps)(Homepage);
