import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Popover, Icon, ListView, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './welfareData.less';
import { join } from 'path';
import util from 'utils/util';
const Item = Popover.Item;


class WelfareData extends Component {
  constructor() {
    super();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      selected: '',
      dataSource,
      isLoading: true,
      listMsg: []
    }
  }
  componentDidMount() {
    if(this.props.match.params) {
      this.props.dispatch({
        type: 'welfare/getSiHf',
        payload: this.props.match.params.id
      });
    }
    
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    this.setState({
      listMsg: this.props.welfareData.welfare_info,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.welfareData.welfare_info !== this.props.welfareData.welfare_info) {
      console.log(nextProps);
      this.setState({
        listMsg: nextProps.welfareData.welfare_info,
      });
    }
  }


  onClickSub = () => {
    this.props.dispatch(routerRedux.push('/ticket'))
  }



  render() {
    let data = this.state.listMsg.list_hf;
    return (
      <div className={styles.container}>
        {/* 备注 */}
        {
          data && data[0].remark ?
            <div className={styles.note}>
              <div>备注: </div>
              <p>{data && data[0].remark}</p>
            </div> : null
        }

        {/* 单卡片 */}
        {/* {this.renderCard()} */}
        <CardList
          dataSource={this.state.listMsg}
          payType={'emp_pay'}//emp_pay, cst_pay, total_pay
          title={'个人缴费'}
        />
        <CardList
          dataSource={this.state.listMsg}
          payType={'cst_pay'}
          title={'公司缴费'}
        />
        <CardList
          dataSource={this.state.listMsg}
          payType={'total_pay'}
          title={'总计'}
        />
        {/* <CardList
          dataSource={this.state.listMsg}
        /> */}
        {/* <div className={styles.header}></div> */}
        <div className={styles.foot}>
          <Button
            activeStyle={{ background: '#ddd' }}
            className={styles.footBtn}
            onClick={this.onClickSub}
          >我有异议</Button>
        </div>
      </div>
    )
  }
}
WelfareData.defaultProps = {

};

WelfareData.propTypes = {

};
function mapStateToProps(state) {
  return {
    welfareData: state.welfare
  }
}

export default connect(mapStateToProps)(WelfareData);


class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMsg: props.dataSource || '',
      payType: props.payType || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        listMsg: nextProps.dataSource
      });
    }
  }

  renderTopCardList = (list) => {
    const msg = this.state.listMsg;
    if (msg[list.listType]) {
      const type = this.state.payType;
      let tempArr = [];
      for (let i = 0; i < msg[list.listType].length; i++) {
        tempArr.push((
          <div key={'cardList' + i} className={styles.listItem}>
            <div>
              <div>{i + 1}</div>
              <div>{msg[list.listType][i].ins_type}</div>
            </div>
            <div>{util.numToString(msg[list.listType][i][type])}</div>
          </div>
        ));
      }
      return (
        <div className={styles.listBody}>
          <div className={styles.listInfo}>
            {tempArr}
          </div>
          <div className={styles.listAdd}>
            <div>{msg[list.totalType].ins_type}</div>
            <div>{util.numToString(msg[list.totalType][type])}</div>
          </div>
        </div>
      )
    }

  }
  render() {
    const type = {
      top: {
        listType: 'list_si',
        totalType: 'si_total'
      },
      down: {
        listType: 'list_hf',
        totalType: 'hf_total'
      }
    }

    return (
      <div className={styles.cardBox}>
        {/*  卡片上 */}
        <div className={styles.cardTop}>
          <div className={styles.cardTitle}>
            <div className={styles.titleBox}>
              <div>{this.props.title || ''}</div>
              <div>
                <div>合计:</div>
                <div>{this.state.listMsg.total && util.numToString(this.state.listMsg.total[this.props.payType])}</div>
              </div>
            </div>
          </div>
          <div className={styles.cardList}>
            <div className={styles.listTitle}>社保:</div>
            {this.renderTopCardList(type.top)}
          </div>
          <i className={styles.circleLeft}></i>
          <i className={styles.circleRight}></i>
        </div>
        {/* 卡片下 */}
        <div className={styles.cardDown}>
          <div className={styles.cardList}>
            <div className={styles.listTitle}>公积金:</div>
            {this.renderTopCardList(type.down)}
          </div>
        </div>

      </div>
    )
  }
}