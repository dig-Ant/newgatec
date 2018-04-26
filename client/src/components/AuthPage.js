import React from 'react';
import propTypes from 'prop-types';
import sys from '../../core/sys';
import { routerRedux } from 'dva/router';

class AuthPage extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: false
    }
  }

  getAuthToken() {
    let queryString = sys.lib.util._queryString.getQSJson(window.location.href);
    if (queryString.auth_token ){
      window.localStorage.setItem('auth_token', queryString.auth_token);
    }
  }
  gotoUrl(url) {
    console.log(url);
    window.location.href = url + encodeURIComponent(window.location.href);
  }
  checkAuthToken() {
    let token = window.localStorage.getItem('auth_token');
    if (!token) { 
      this.setState({
        isShow: false
      })
      let isWx = sys.lib.util._isWx.isWxBrower();
      if (isWx) {
        this.gotoUrl("http://bc1f9980.ngrok.io/wx/auth?path=");
      } else {
        //跳转到登录授权页面
        this.props.dispatch(routerRedux('/testHomeB'));
      }
    
    }
  }
  componentWillMount() {
    this.getAuthToken();
    this.checkAuthToken();
    this.setState({
      log: sys.lib.util._queryString.getQSJson(),
      isShow: true
    });
  }

  renderContent() {
    return (
      <div>
        <h1 className="aa" style={{ color: 'green' }}>跳转页面</h1>
      </div>
    )
  }
  render() {
    return (
      <div>
        {
          this.state.isShow ? this.renderContent(): null
        }
      </div>
    );
  }
}

AuthPage.defaultprops = {

}
AuthPage.propTypes = {

};

export default AuthPage;
