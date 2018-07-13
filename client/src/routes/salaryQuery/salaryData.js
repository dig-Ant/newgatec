import React, { Component } from 'react';
import styles from './salaryData.less';
import { connect } from 'dva';
import { ListView, Button, Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import {i18n} from '../../utils/i18n'
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
      isFav: '',
      isEnd:false
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
    this.setState({isEnd:true});
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

  _header(){
     return(
       <div className={styles.listHeaderDiv}>
         
         <div className={styles.headerDiv}>
           <img  className={styles.headerImg} src={require('../../assets/loginIcon.png')} />
           <span className={styles.headerSpan}>上海才赋人力资源科技有限公司</span>
         </div>
       </div>
     ) 
  }
  _footer(){
    return(
      <div style={{color:'#000'}}>
        <span>备注:</span>
        <span>{note}</span>
      </div>
    );
  }
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
        // onScroll={(e)=>{console.log(e)}}
        // onLayout={({nativeEvent:{ layout:{ width, height }}}) => {console.log(height)}}
        pageSize={20}
        // scrollRenderAheadDistance={1500}
        onEndReached={() => this.onEndReached()}//距离底部10的时候调用的方法
        onEndReachedThreshold={10}
        initialListSize={20}
        renderFooter={this._footer}
      />
    )

  }
  _dDown(){
    if(this.state.isEnd){
      return(
        <div className={styles.dDown}>
              <Button onClick={() => this._button()}  
              activeStyle={{backgroundColor:'rgba(255,255,255,.7)'}}
              className = {styles.button}
              style={{ width: 100,  color: '#000' }}
              >我有异议</Button>

        </div>
      );
    }else{
      return null;
    }
    
  }

  _button() {
    this.props.dispatch(routerRedux.replace('/complaint'))
  }

  render() {
    // console.log(this.props.salaryData.salary_obj.unit)
    console.log(this.props.salaryData.salary_obj)
    let _unit = this.props.salaryData.salary_obj.unit;
    let currency = _unit!=null&&_unit!=''?i18n[_unit]['ch']:i18n['rmb']['ch'];
    let salary_obj= this.props.salaryData.salary_obj
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.topText}>{list_date?list_date:''}</span>
          <span >{data_list?data_list['收入类型']:''}</span>
        </div>
        <div className={styles.down}>
          <div className={styles.dTop}>
            <span className={styles.dtText1}>货币类型:</span>
            <div>
              <span className={styles.dtText2}>{currency}</span>
            </div>
              
          </div>
          {this._header()}
          <div className={styles.dCenter}>
            
            <div className={styles.listDiv}>
             
              {this.List_View()}
            </div>

          </div>
          

        </div>
        {this._dDown()}

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