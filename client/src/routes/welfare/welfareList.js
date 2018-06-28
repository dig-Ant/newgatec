import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Popover, Icon, ListView } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './welfareList.less';

const Item = Popover.Item;

class WelfareList extends Component {
  constructor() {
    super();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      visible: false,
      selected: '',
      dataSource,
      isLoading: true,
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'welfare/getYearArray'
    });

    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.welfareData.welfareMsg !== this.props.welfareData.welfareMsg) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.welfareData.welfareMsg.data),
      });
    }
  }
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    this.props.dispatch({
      type: 'welfare/changeYearSelect',
      payload: opt.props.value
    });
    this.props.dispatch({
      type: 'welfare/getPlantSlect',
      payload: { year: opt.props.value }
    });
  }
  handleVisibleChange = (visible) => {
    console.log('handleVisibleChange', visible);
    // this.setState({
    //   visible,
    // });
  }
  renderTitle = () => {
    let { yearSelect, yearArray } = this.props.welfareData;
    if(yearArray.length == 0) {
      return (
        <div className={styles.title}>
          <span className={styles.titleInfo}>暂无数据请返回上一页</span>
        </div>
      )
    }
    let tempArr = [];
    yearArray.map((v, i) => {
      tempArr.push(<Item key={'yearItem' + i} value={v} >{v}年度</Item>);
    });
    return (
      <div className={styles.title}>
        <span className={styles.titleInfo}>{this.state.selected || yearSelect || yearArray[0]}年度</span>
        <Popover
          mask
          overlayClassName="fortest" //覆盖类名
          overlayStyle={{ color: 'currentColor' }}
          visible={this.state.visible}
          overlay={tempArr}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-13, 0],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          >
            <Icon type="down" style={{ color: '#fff' }} />
          </div>
        </Popover>
      </div>
    )
  }

  itemClick = (rowData) => {
    let { plant_get, si_hf_status, ...data } = rowData;
    this.props.dispatch({
      type: 'welfare/getPlantRead',
      payload: data
    });
  }
  renderList = () => {
    const separator = (sectionID, rowID) => {
      return (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      )
    };
    // let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      let { welfareMsg } = this.props.welfareData;
      let tempArr = [];
      for (let i = 0; i < rowData.length; i++) {
        tempArr.push((
          <div key={'down' + i} className={styles.downItem} onClick={() => this.itemClick(rowData[i])}>
            <div>
              <div>{rowData[i].ins_year}年{rowData[i].ins_month}月</div>
              <div>{welfareMsg.total_data[rowID][i]}</div>
            </div>
            <div className={styles.tagGreen}>
              <span>{rowData[i].si_hf_status == 1 ? '正' : '补'}</span>
            </div>
          </div>
        ));
      }
      return (
        <div className={styles.item}>
          <div className={styles.itemInfo}>
            <div className={styles.itemTop}>
              <div className={styles.topTitle}>
                <span>{`${rowData[0].payment_year}.${rowData[0].payment_month}`}</span>
              </div>
              {
                rowData[0].plant_get == 0 ?
                  <div className={styles.tagRed}><span>新</span></div> : null
              }
            </div>
            <div className={styles.itemDown}>
              {tempArr}
            </div>
          </div>
        </div>
      );
      return (
        <div className={styles.item} key={rowID}>
          <div className={styles.itemTop}>
            <span>{`${rowData.year}年${rowData.month}`}</span>
            {
              rowData.read_status === 0 ?
                <div className={styles.circle}></div>
                : null
            }
          </div>
          <div className={styles.itemInfo} >
            <div className={styles.itemInfo_left}>{rowData.pay_type}</div>
            <div><span style={{ fontSize: '20px', color: '#FF6E27', verticalAlign: '-2' }}>{rowData.unit}</span>&nbsp;<span>{rowData.pay}</span></div>
          </div>
        </div >
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span> header</span >}
        renderFooter={() => (<div style={{ padding: 20, textAlign: 'center' }}>
          这一年的记录已经没有了哦
        </div>)}
        renderRow={row}
        // renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
      // initialListSize={2}
      />
    )
  }
  render() {
    return (
      <div className={styles.container}>
        {this.renderTitle()}
        {this.renderList()}
      </div>
    )
  }
}
WelfareList.defaultProps = {

};

WelfareList.propTypes = {

};
function mapStateToProps(state) {
  return {
    welfareData: state.welfare
  }
}

export default connect(mapStateToProps)(WelfareList);
