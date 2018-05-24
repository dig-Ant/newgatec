import React from 'react';
// import propTypes from 'prop-types';
import { Button } from 'antd-mobile';
import styles from './CountDown.less';

class CountDown extends React.Component {
  constructor(props) {
    console.log(props);
    super(props)
    this.state = {
      isShow: true,
      count: 5
    }
    this.time = '';
  }

  componentDidMount() {
    this.setState({ count: this.props.count });
  }
  componentWillUnmount() {
    clearInterval(this.time);
    this.setState({ isShow: true, count: this.props.count });
  }
  onClickValid() {
    if (this.props.customOnClick) {
      return this.props.customOnClick();
    }
    this.setState({ isShow: false });
    this.time = setInterval(() => {
      this.setState({
        count: this.state.count - 1
      }, () => {
        if (this.state.count == 0) {
          clearInterval(this.time);
          this.setState({ isShow: true, count: this.props.count });
          console.log('this.---', this.props);
        }
      });
    }, 1000);
    if (this.props.addClick) {
      this.props.addClick();
    }
  }
  render() {
    return (
      <div>
        {
          this.state.isShow ?
            <Button
              onClick={this.onClickValid.bind(this)}
              className={this.props.buttonStyle || styles.buttonStyle}
            >获取验证码</Button> :
            <Button disabled
              className={this.props.buttonStyle || styles.buttonStyle}
            >{this.state.count}秒后重新发送</Button>
        }
      </div>
    );
  }
}
CountDown.defaultProps = {
  count: 60
}
CountDown.propTypes = {

};

export default CountDown;
