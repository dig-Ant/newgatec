import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Popover, Icon, ListView } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './salaryList.less';

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
    console.log(this.props.salaryData);

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
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    this.props.dispatch({
      type: 'salary/getPlantSlect',
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
    let yearArr = this.props.salaryData.yarnArray;
    let tempArr = [];
    yearArr.map((v, i) => {
      tempArr.push(<Item key={'yearItem' + i} value={v} >{v}年度</Item>);
    });
    return (
      <div className={styles.title}>
        <span className={styles.titleInfo}>{this.state.selected || yearArr[0]}年度</span>
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
          <div  style={{
            height: '100%',
            padding: '0 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          >
            <Icon type="down" style={{color: '#fff'}}/>
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
    // let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      // console.log('json',Object.keys(JSON.parse(rowData.data)));
      // console.log('json',Object.values(JSON.parse(rowData.data)));
      return (
        <div className={styles.item} key={rowID} onClick={() =>this.itemClick(rowData)}>
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
            <div><span style={{ fontSize: '20px', color: '#FF6E27',verticalAlign:'-2'  }}>{rowData.unit}</span>&nbsp;<span>{rowData.pay}</span></div>
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
