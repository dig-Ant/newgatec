import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Popover, Icon, ListView } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './salaryList.less';
import util from 'utils/util';
import { i18n } from 'utils/i18n';

const Item = Popover.Item;

class SalaryList extends Component {
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
      type: 'salary/getYearArray'
    });

    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.salaryData.salaryMsg)
    });
    // simulate in
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.salaryData.salaryMsg !== this.props.salaryData.salaryMsg) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.salaryData.salaryMsg),
      });
    }
  }
  onSelect = (opt) => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    this.props.dispatch({
      type: 'salary/changeYearSelect',
      payload: opt.props.value
    });
    this.props.dispatch({
      type: 'salary/getPlantSlect',
      payload: { year: opt.props.value }
    });
  }
  handleVisibleChange = (visible) => {
    console.log('handleVisibleChange', visible);
    this.setState({
      visible,
    });
  }
  renderTitle = () => {
    let { yearSelect, yearArray } = this.props.salaryData;
    if (yearArray.length == 0) {
      return (
        <div className={styles.title}>
          <span className={styles.titleInfo}>暂无数据</span>
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
    this.props.dispatch({
      type: 'salary/getPlantRead',
      payload: rowData
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
    const row = (rowData, sectionID, rowID) => {
      let unit = i18n[rowData.unit] && i18n[rowData.unit]['currency_symbol'];
      return (
        <div className={styles.item} key={rowID} onClick={() => this.itemClick(rowData)}>
          <div className={styles.itemTop}>
            <span>{`${rowData.year}年${rowData.month}月`}</span>
            {
              rowData.read_status === 0 ?
                <div className={styles.circle}></div>
                : null
            }
          </div>
          <div className={styles.itemInfo} >
            <div className={styles.itemInfo_left}>{rowData.pay_type}</div>
            <div><span style={{ fontSize: '20px', color: '#FF6E27', verticalAlign: '-2' }}>{unit}</span>&nbsp;<span>{util.numToString(rowData.pay)}</span></div>
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
        renderSeparator={separator}
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
SalaryList.defaultProps = {

};

SalaryList.propTypes = {

};
function mapStateToProps(state) {
  return {
    salaryData: state.salary
  }
}

export default connect(mapStateToProps)(SalaryList);
