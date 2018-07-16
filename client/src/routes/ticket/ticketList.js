import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticketList.less';
import { Icon, Card, WingBlank, WhiteSpace, SwipeAction, Tabs, Badge, ListView } from 'antd-mobile';
import { ticket } from '../../assets';
import { StickyContainer, Sticky } from 'react-sticky';
import util from 'utils/util';


class TicketList extends Component {

  constructor() {
    super()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      serverType: 'salary' || 'general',// salary welfare
      dataSource,
      isLoading: true,
      msgList: [
        {
          "tkt_key": "6d2b7771-9510-416d-a99d-22dae814da5a",
          "cst_key": "1",
          "clt_key": "0",
          "tkt_type": 2,
          "tkt_state_code": 100,
          "subject": "薪酬异议最多只能十二个字",
          "des": "我的六月份薪酬账单有问题!",
          "remark": null,
          "renew": 1,
          "sticky": 1,
          "sticky_time": "2018-07-10T02:18:27.024Z",
          "auto_close_time": null,
          "create_date": "2018-07-10T02:06:26.223Z",
          "write_date": "2018-07-10T02:06:26.223Z",
          "attch_id": null,
          "write_date": "2018-07-10T02:06:26.223Z"
        },
        {
          "tkt_key": "e6c28bfe-e392-45c3-99fa-e9fbe067f82d",
          "cst_key": "1",
          "clt_key": "0",
          "tkt_type": 3,
          "tkt_state_code": 100,
          "subject": "薪酬异议",
          "des": "我的六月份薪酬账单有问题!",
          "remark": null,
          "renew": 1,
          "sticky": 0,
          "sticky_time": null,
          "auto_close_time": null,
          "create_date": "2018-07-10T02:06:26.408Z",
          "write_date": "2018-07-10T02:06:26.407Z",
          "attch_id": null,
          "write_date": "2018-07-10T02:06:26.223Z"
        },
        {
          "tkt_key": "bc777878-2b29-412c-911a-4cd0ca44406d",
          "cst_key": "1",
          "clt_key": "0",
          "tkt_type": 1,
          "tkt_state_code": 100,
          "subject": "薪酬异议",
          "des": "我的六月份薪酬账单有问题!",
          "remark": null,
          "renew": 1,
          "sticky": 0,
          "sticky_time": null,
          "auto_close_time": null,
          "create_date": "2018-07-10T02:06:26.021Z",
          "write_date": "2018-07-10T02:06:26.021Z",
          "attch_id": null,
          "write_date": "2018-07-10T02:06:26.223Z"
        },
        {
          "tkt_key": "7d404b3d-b370-4bdb-95e1-d1a13ceb5bd8",
          "cst_key": "1",
          "clt_key": "0",
          "tkt_type": 5,
          "tkt_state_code": 100,
          "subject": "薪酬异议",
          "des": "我的六月份薪酬账单有问题!",
          "remark": null,
          "renew": 1,
          "sticky": 0,
          "sticky_time": null,
          "auto_close_time": null,
          "create_date": "2018-07-10T02:06:25.825Z",
          "write_date": "2018-07-10T02:06:25.825Z",
          "attch_id": null,
          "write_date": "2018-07-10T02:06:26.223Z"
        },
        {
          "tkt_key": "f8a2076e-60a3-4b1a-bb7c-58436422c6dc",
          "cst_key": "1",
          "clt_key": "0",
          "tkt_type": 1,
          "tkt_state_code": 100,
          "subject": "薪酬异议",
          "des": "我的六月份薪酬账单有问题!",
          "remark": null,
          "renew": 1,
          "sticky": 0,
          "sticky_time": null,
          "auto_close_time": null,
          "create_date": "2018-07-10T02:06:25.604Z",
          "write_date": "2018-07-10T02:06:25.604Z",
          "attch_id": null,
          "write_date": "2018-07-10T02:06:26.223Z"
        },
      ]
    }
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.msgList),
        isLoading: false,
      });
    }, 600);
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.dataSource !== this.props.dataSource) {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //   });
    // }
  }
  onTop = (a) => {
    console.log(a);
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    // setTimeout(() => {
    //   this.rData = { ...this.rData, ...genData(++pageIndex) };
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 1000);
  }

  renderList = () => {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#fff',
          height: 8,
        }}
      />
    );
    const row = (v, sectionID, rowID) => {

      return (
        <div className={styles.cardBox}>
          <SwipeAction
            style={{
              backgroundColor: 'gray'
            }}
            autoClose
            right={[
              {
                text: <div style={{ padding: '0px 5px' }}>取消</div>,
                onPress: () => console.log('cancel'),
                style: { backgroundColor: '#ddd', color: 'white' },
              },
              {
                text: <div style={{ padding: '0px 5px' }}>撤销</div>,
                onPress: () => console.log('delete'),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
          >
            <Card >
              <Card.Header
                title={v.subject}
                thumb={
                  <div className={styles.cardHeader}>
                    <img src={ticket['type' + v.tkt_type]} alt="" />
                  </div>}
              // extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div className={styles.cardBody}>
                  <div className={styles.cardBodyLeft}>
                    <span>状态: </span>
                    <div className={styles.circle}></div>
                    <span>已提交</span>
                  </div>
                  <div className={styles.timer}>
                    {util.getDateToStr(v.write_date)}
                  </div>
                </div>
              </Card.Body>
              <Card.Footer
                content={
                  <div
                    onClick={() => this.onTop(v)}
                    className={styles.cardFooter}>
                    <img src={v.sticky == 1 ? ticket.xing4 : ticket.xing2} alt="" />
                    <span>{v.sticky == 1 ? '置顶' : '取消置顶'}</span>
                  </div>
                }
                extra={<div>详情</div>} />
            </Card>
          </SwipeAction>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={10}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        initialListSize={10}
      />
    );
  }

  renderTabBar(props) {
    return (
      <Sticky>
        {({ style }) => <div style={{ ...style, top: 53, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>
    );
  }

  tabs = () => {
    return [
      { title: <Badge text={'3'}>进行中的服务请求</Badge> },
      { title: <Badge text={'20'}>查看历史</Badge> },
    ]
  };

  render() {
    return (
      <div className={styles.container}>
        <StickyContainer>
          <Tabs
            renderTabBar={this.renderTabBar}
            swipeable={false}
            tabs={this.tabs()}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >

            <div className={styles.tabFirst}>
              {/* <div className={styles.wu}>暂无进行中的服务请求</div> */}
              <WingBlank size="lg">
                {this.renderList()}
              </WingBlank>
            </div>
            <div className={styles.tabSecd}>
              <div className={styles.wu}>暂无历史记录</div>
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    )
  }

}

function mapStateToProps(state) {

}

export default connect()(TicketList);