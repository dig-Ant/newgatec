import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './complaint.less';
import { ImagePicker, TextareaItem,Button,Toast } from 'antd-mobile';

const data = [];
class Complaint extends Component {

  constructor() {
    super()
    this.state = {
      files: data,
      text:''
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });

  }
  componentDidUpdate() {
    // console.log(this.state.text)
  }

  _submit(){
    if(this.state.text==''){
      Toast.info('请输入文字',1)
    }else{
      let req = {
        images:this.state.data,
        txt:this.state.text
      }
      Toast.info('您的申诉已提交,感谢您的支持!',2)
    }
  }
  render() {

    return (
      <div className={styles.container}>
        <div className={styles.top} >
          <div className={styles.div1}>
            <span className={styles.text}>请描述您需要提交的内容:</span>
          </div>
          <div className={styles.div2}>
            <div style={{ border: '1px solid #000' }}>
              <TextareaItem
                // {...getFieldProps('note3')}
                // title="高度自适应"
                placeholder={'薪资异议...'}
                rows={5}
                count={100}
                onChange={(text)=>{this.setState({text:text})}}
                style={{fontSize:14}}
                // autoHeight
                labelNumber={5}
              />
            </div>

          </div>
        </div>
        <div className={styles.conter}>
          <ImagePicker
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 5}
            multiple={true}
          />
        </div>
        <div className={styles.bottom}>
          <Button className = {styles.button} 
          onClick={() => this._submit()} 

          // type="primary"
          activeStyle={{backgroundColor:'rgba(255,255,255,.7)'}}
          style={{ width: 100, color: '#000' }}
          >提交</Button>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {

}

export default connect()(Complaint);