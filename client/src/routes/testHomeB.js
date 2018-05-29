import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'dva';

// class TestHomeB extends Component {
//   constructor() {
//     super();
//     this.state = {

//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>普通浏览器 登录页</h1>
//       </div>
//     )
//   }
// }

// export default connect()(TestHomeB);

import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class H5NumberInputExample extends Component {
  state = {
    type: 'money',
    names: '123'
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { type } = this.state;
    let errors;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          flex: 1,
          background: 'red',
          height: '20vh',
          width: '100%',
          marginLeft: 20
        }}>1</div>
        <div style={{
          flex: 1,
          background: 'green',
          height: '20vh'
        }}>2</div>
      </div>
    );
  }
}

const H5NumberInputExampleWrapper = createForm()(H5NumberInputExample);
export default H5NumberInputExampleWrapper;
