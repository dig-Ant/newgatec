import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './salaryData.less';
import { connect } from 'dva';
import { ListView, Button, Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
let data_list;
let list_date;
let note;
class SalaryData extends Component {

  constructor() {
    super();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
      isFav: ''
    }

  }

  componentDidMount() {

    if (JSON.stringify(this.props.salaryData.salary_obj) != "{}") {
      data_list = JSON.parse(this.props.salaryData.salary_obj.data);
      list_date = this.props.salaryData.salary_obj.year+'年'+this.props.salaryData.salary_obj.month+'月';
      note= this.props.salaryData.salary_obj.note;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(Object.keys(data_list)),
        isLoading: false,
        // height: hei,
      });
    }
    this.setState({ isFav: '1' })



  }
  componentDidUpdate() {
    if (JSON.stringify(this.props.salaryData.salary_obj) == "{}") {
      this.props.dispatch(routerRedux.replace('/salaryList'))
    }
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.salaryData.salary_obj !== this.props.salaryData.salary_obj) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(Object.keys(data_list)),
      });
    }
  }
  onEndReached = (event) => {

    Toast.info('到底了', 1);
  }

  row = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID} className={styles.listItem}>
        <span>{rowData}</span>
        <span>{data_list[rowData]}</span>
      </div>
    );
  };

  List_View = () => {
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderRow={this.row}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
        pageSize={20}
        // scrollRenderAheadDistance={1500}
        onEndReached={() => this.onEndReached()}//距离底部10的时候调用的方法
        onEndReachedThreshold={10}
        initialListSize={20}
      />
    )

  }

  _button() {
    Toast.info('我有异议')
  }

  render() {
    console.log(this.props.salaryData.salary_obj)
      let salary_obj= this.props.salaryData.salary_obj
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.topText}>{list_date?list_date:''}</span>
          <span >{data_list?data_list['收入类型']:''}</span>
        </div>
        <div className={styles.down}>
          <div className={styles.dTop}>
            <span className={styles.dtText1}>备注:</span>
            <div>
              <span className={styles.dtText2}>{note}</span>
            </div>

          </div>
          <div className={styles.dCenter}>
            <div className={styles.listDiv}>

              {this.List_View()}
            </div>

          </div>
          <div className={styles.dDown}>
            <Button onClick={() => this._button()} type="primary" inline size="small" style={{ width: 100, background: 'yellow', color: '#000' }}>我有异议</Button>

          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    salaryData: state.salary
  }
}

export default connect(mapStateToProps)(SalaryData);