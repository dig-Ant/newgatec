import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'homepage/getInfo',
    });
    this.props.dispatch({
      type: 'wxSdk/setConfig'
    });
  }

  onActivation() {
    this.props.dispatch(routerRedux.push('/active'));
  }
  onPhoto() {
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        console.log(res);
        alert(JSON.stringify(res));
      }
    });
  }

  onChange(data) {
    console.log('data---', data);
    console.log(this.input.files[0]);
    let datas = new FormData();
    datas.append('file',this.input.files[0]);
    datas.append('id_card_side', 'front/');
    console.log('formData---',datas);
    const option = {
      method: 'post',
      // mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: datas
    };
    fetch('http://172.16.1.139:8888/userhost/api/private/general_id_card', option)
      .then(function (response) {
        if (response.ok) {
          console.log('suc')
          return response.text();
        } else {
          console.log('网络错误，请稍后再试')
          return;
        }
      }).then(function (data) {
        console.log('imgUrl', data);
      })
  }
  render() {
    return (
      <div>
        <h1>我是home页面</h1>
        <h2>{this.props.data}</h2>
        <h2>{this.props.token.token_wx}</h2>
        <h2>{this.props.token.token_cf}</h2>
        <input
          type="file"
          ref={ref => this.input = ref}
          onChange={this.onChange.bind(this)}
        />
        <Button
          onClick={this.onActivation.bind(this)}
        >点击激活账号</Button>
        <Button
          onClick={this.onPhoto.bind(this)}
        >拍照</Button>
        {/* <img src='wxLocalResource://547639309018183'></img> */}
        {/* <input type="file" name="upload" onchange="onChooseFile(this)" accept="image/png,image/jpeg,image/gif,video/*" capture="camera" /> */}
      </div>
    )
  }
}
Homepage.defaultProps = {

};

Homepage.propTypes = {

};
function mapStateToProps(state) {
  return {
    data: state.homepage.data,
    token: state.handleToken.token
  }
}

export default connect(mapStateToProps)(Homepage);
