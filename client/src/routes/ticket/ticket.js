import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ticket.less';
import { ImagePicker, TextareaItem, Button } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class Ticket extends Component {

  constructor() {
    super()
    this.state = {
      serverType: 'salary' || 'general',// salary welfare
      labelList: ['薪酬社保', '员工福利', '礼卡兑换', '保障与理赔', '积分有关', '体检预约', 'BUG与建议', '以上都不是'],
      labelValue: ['salary', 'salary1', 'salary2', 'salary3', 'salary4', 'salary5', 'salary6', 'salary7'],
      selectLabel: 'salary',// 当前选择的标签
      textareValue: '',
      textError: false,
      files: data
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'wxSdk/setConfig'
    });
  }
  renderTitle = () => {
    let { serverType } = this.state;
    if (serverType == 'general') {
      return (
        <div className={styles.title}>
          <p className={styles.title1}>在这里提交您的服务请求</p>
        </div>
      );
    } else if (serverType == 'salary' || serverType == 'welfare') {
      return (
        <div className={styles.title}>
          <p>即将为您提交一条有关</p>
          <p>工资条疑义处理的服务请求</p>
        </div>
      )
    }
  }

  onLabelClick = (i) => {
    this.setState({
      selectLabel: i
    });
  }

  renderLabel = () => {
    let { serverType } = this.state;
    if (serverType == 'general') {
      let labelArr = [];
      let { labelList, labelValue } = this.state;
      labelList.forEach((v, i) => {
        labelArr.push((
          <Button
            key={'label' + i}
            onClick={() => this.onLabelClick(labelValue[i])}
            className={styles.labelBtn}
            style={{
              backgroundColor: this.state.selectLabel == labelValue[i] ? '#73d7dc' : '#fff',
              color: this.state.selectLabel == labelValue[i] ? '#fff' : '#666'
            }}
            // size='small'
            inline
          // activeStyle={{ backgroundColor: '#73d7dc' }}
          >{v}</Button>
        ));
      });
      return (
        <div className={styles.labelBox}>
          <p>请问您需要有关什么方面的帮助?请选择类型</p>
          <div className={styles.labelInfo}>
            {labelArr}
          </div>
        </div>
      )
    } else if (serverType == 'salary' || serverType == 'welfare') {
      let data = [
        { title: '薪酬期间', value: '2018年8月' },
        { title: '收入类型', value: '工资薪金' },
        { title: '实发工资', value: '¥ 88888.88' }
      ]
      let tempArr = [];
      data.forEach((v, i) => {
        tempArr.push((
          <div key={'salary' + i} className={styles.labelList}>
            <div>{v.title}</div>
            <div>{v.value}</div>
          </div>
        ));
      });

      return (
        <div className={styles.labelBox}>
          {tempArr}
        </div>
      )
    }
  }
  textareChange = (i) => {
    console.log(i);
    this.setState({
      textareValue: i
    });

  }
  onTextBlur = () => {
    if (this.state.textareValue.trim().length <= 10) {
      this.setState({
        textError: true
      })
    } else {
      this.setState({
        textError: false
      })
    }

  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  onAddImageClick = (e) => {

    e.preventDefault();
    // this.setState({
    //   files: this.state.files.concat({
    //     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    //     id: '3',
    //   }),
    // });

    let _this = this;
    let src = '';
    window.wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是远图还是压缩图, 默认两者都有
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localId;
        // {localData: data:image/jgp;base64/,/9j/.....} ios
        // {localData: /9j/} android
        var localData = res.localData;
        if(window.__wxjs_is_wkwebview) {
          localData = localData.replace('jpg', 'jpeg');
        } else {
          localData = 'data:image/jpeg;base64,' + localData;
        }
        alert(localData);
      }
    });
  };
  onSubmit = (i) => {
    console.log(i);
    this.props.dispatch(routerRedux.push('/ticketRes'));
  }
  render() {

    return (
      <div className={styles.container}>
        {/* title */}
        {this.renderTitle()}
        {/* 标签 */}
        {this.renderLabel()}
        {/* 详细说明 */}
        <div className={styles.textBox}>
          <div>
            <p>请详细说明:</p>
            <p>(10-100个字)</p>
          </div>
          <TextareaItem
            value={this.state.textareValue}
            onChange={this.textareChange}
            rows={4}
            count={100}
            error={this.state.textError}
            onBlur={this.onTextBlur}
            style={{ backgroundColor: "#f7f7f7" }}
          />
        </div>
        {/* 图片添加 */}
        <div className={styles.imgBox}>
          <p>添加图片:</p>
          <ImagePicker
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 3}
            onAddImageClick={this.onAddImageClick}
          />
        </div>
        {/* 提交 */}
        <div className={styles.submit}>
          <Button
            className={styles.submitBtn}
            onClick={this.onSubmit}
            activeStyle={{ backgroundColor: '#ddd' }}
          >填写完毕, 我要提交</Button>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {

}

export default connect()(Ticket);