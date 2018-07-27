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
    const overDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      serverType: 'salary' || 'general',// salary welfare
      dataSource,
      overDataSource,
      isLoading: true,
      msgList: []
    }
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
      });
    }
    if (nextProps.overData !== this.props.overData) {
      this.setState({
        overDataSource: this.state.dataSource.cloneWithRows(nextProps.overData),
      });
    }
  }
  onTop = (a) => {
    console.log(a);
    if (this.props.onTop) {
      return this.props.onTop(a);
    }
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
  // 撤销一条消息
  onCancel = (data) => {
    if (this.props.onCancel) {
      return this.props.onCancel(data);
    }
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
      if (v.tkt_state_code >= 600) {
        return (
          <div className={styles.cardBox}>
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
                    <span>{v.work_order}</span>
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
                    <span>{v.sticky == 1 ? '取消置顶' : '置顶'}</span>
                  </div>
                }
                extra={<div
                  onClick={() => this.onTicketInfo(v)}
                >详情</div>} />
            </Card>
          </div>
        );
      }
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
                onPress: () => this.onCancel(v),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
          // onOpen={() => console.log('global open')}
          // onClose={() => console.log('global close')}
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
                    <span>{v.work_order}</span>
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
                    <span>{v.sticky == 1 ? '取消置顶' : '置顶'}</span>
                  </div>
                }
                extra={<div
                  onClick={() => this.onTicketInfo(v)}
                >详情</div>} />
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
        // onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        initialListSize={10}
      />
    );
  }
  // 详情按钮
  onTicketInfo = (v) => {
    if (this.props.onTicketInfo) {
      return this.props.onTicketInfo(v);
    }
  }
  // 历史记录列表
  renderOverList = () => {
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
                  <span>{v.work_order}</span>
                </div>
                <div className={styles.timer}>
                  {util.getDateToStr(v.write_date)}
                </div>
              </div>
            </Card.Body>
            <Card.Footer
              content={
                <div
                  className={styles.cardFooter}>
                </div>
              }
              extra={<div
                onClick={() => this.onTicketInfo(v)}
              >详情</div>} />
          </Card>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.overDataSource}
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
      { title: <Badge text={''}>进行中的服务请求</Badge> },
      { title: <Badge text={''}>查看历史</Badge> },
    ]
  };
  // tab 改变的时候触发 
  tabOnChange = (tab, index) => {
    console.log('tab', index, tab);
    if (this.props.tabOnChange) {
      return this.props.tabOnChange(tab, index);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <StickyContainer>
          <Tabs
            renderTabBar={this.renderTabBar}
            swipeable={false}
            tabs={this.tabs()}
            initialPage={0}
            onChange={this.tabOnChange}
          // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >

            <div className={styles.tabFirst}>
              {/* <div className={styles.wu}>暂无进行中的服务请求</div> */}
              <WingBlank size="lg">
                {this.renderList()}
              </WingBlank>
            </div>
            <div className={styles.tabSecd}>
              {/* <div className={styles.wu}>暂无历史记录</div> */}
              <WingBlank size="lg">
                {this.renderOverList()}
              </WingBlank>
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