import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './salaryData.less';
import { connect } from 'dva';
import {ListView,Button,Toast } from 'antd-mobile';






class SalaryData extends Component {

  constructor() {
    super();
    // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    // const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    // const dataSource = new ListView.DataSource({
    //   // getRowData,
    //   // getSectionHeaderData: getSectionData,
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    //   // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    // });
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    }

  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax

    setTimeout(() => {
    
      let obj = [
        {a:123213123,b:234234},
        {a:123213123,b:234234},
        {a:123213123,b:234234},
        {a:123213123,b:234234},
        {a:123213123,b:234234},
        {a:123213123,b:234234},
      ]
      let obj1 = {
        a: '1',
        b: '2',
        c: '3',
        d: '4',
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(obj),
        isLoading: false,
        // height: hei,
      });
    }, 600);
  }

  onEndReached = (event) => {

    Toast.info('到底了', 1);
  }

  row = (rowData, sectionID, rowID) => {
   
    return (
      <div key={rowID} className={styles.listItem}>
        <span>12</span>
        <span>12</span>
      </div>
    );
  };

  List_View =()=>{
    return(
        <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderRow={()=>this.row()}
        style={{
          height:'100%',
          overflow: 'auto',
        }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        onEndReached={()=>this.onEndReached()}//距离底部10的时候调用的方法
        onEndReachedThreshold={10}
      />
    )

  }

  
  render() {

    
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.topText}>2018年5月</span>
          <span >工资</span>
        </div>
        <div className={styles.down}>
          <div className={styles.dTop}>
            <span className={styles.dtText1}>备注:</span>
            <div>
              <span className={styles.dtText2}>#####bdjhcfgdjhfgfkjfdgfkjhgjfk5451651161615616h</span>
            </div>

          </div>
          <div className={styles.dCenter}>
            <div className={styles.listDiv}>
            
              {this.List_View()}
            </div>
              
          </div>
          <div className={styles.dDown}>
          <Button type="primary" inline size="small" style={{ width:100,background:'yellow',color:'#000' }}>我有异议</Button>
      
          </div>
              
        </div>

      </div>
    )
  }
}


export default connect()(SalaryData);