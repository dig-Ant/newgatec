import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Carousel, WingBlank, WhiteSpace, Picker, List, InputItem, DatePicker, TextareaItem, Modal, ImagePicker } from 'antd-mobile';
import styles from './submitInfo.less';
import { Route, Switch } from 'dva/router';
import companyImg from '../../assets/company';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import verifyForm from '../identityVerify/verifyForm';
import util from '../../utils/util';
import classNames from 'classnames';
import CompanyImg from '../../assets/company';
const alert = Modal.alert;

const Item = List.Item;




class SubmitInfo extends Component {
  constructor() {
    super();
    this.state = {
      cardType: 'more' && 'id_card',
    }
  }

  componentDidMount() {
    // 查询证件信息
    let queryString = util.getQSJson();
    // if (queryString.task_id) {
    //   this.props.dispatch({
    //     type: 'company/get_certificate_info',
    //     payload: 'id_card'
    //   });
    // }
    this.props.dispatch({
      type: 'company/changeHeaderSelect',
      payload: 2
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.companyData.certificateInfo !== nextProps.companyData.certificateInfo) {
      let certificateInfo = nextProps.companyData.certificateInfo;

    }
  }


  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div className={styles.container}>
        {/* 渲染主体 */}
        <div className={styles.box}>
          <div className={styles.boxInfo}>
            <div className={styles.article}>
              <p>1、本人承诺以上各项信息资料均真实完整有效，如有不实，公司可立即无条件辞退本人。</p>
              <p>2、我保证在上述信息发生变更时，及时通知公司。</p>
              <p>3、我同意授权公司对所填写信息进行核实。</p>
            </div>
            <div className={styles.btn}>
              <div className={styles.submitBtn}>
                <Button
                  style={{backgroundColor: 'rgba(151, 217, 213, 1)'}}
                  activeStyle={{ backgroundColor: '#ddd' }}
                >确认，提交HR</Button>
              </div>
              {/* <div className={styles.draftBtn}>
                <Button
                  style={{backgroundColor: '#ccc'}}
                  activeStyle={{ backgroundColor: '#ddd' }}
                >保存草稿</Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SubmitInfo.defaultProps = {

};

SubmitInfo.propTypes = {

};
function mapStateToProps(state) {
  return {
    companyData: state.company
  }
}

const SubmitInfoWrapper = createForm()(SubmitInfo);
export default connect(mapStateToProps)(SubmitInfoWrapper);
