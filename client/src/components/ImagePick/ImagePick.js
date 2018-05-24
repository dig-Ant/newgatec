import React from 'react';
import propTypes from 'prop-types';
import styles from './ImagePick.less';

class ImagePick extends React.Component {
  constructor(props) {
    super(props);
    let message = this.prepare(props);
    this.state = {
      message: message || []
    };
  }

  
  // 根据类型准备相对应message
  prepare = (props) => {
    let msg = this.selectType(props.type);
    return msg;
  }
  // 根据type 返回 默认的数据
  selectType = (type) => {
    if (type === 'idCard') {
      let message = [{
        title: '身份证姓名面:',
        img: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        isShow: false
      }, {
        title: '身份证国徽面:',
        img: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        isShow: false
      }];
      return message;
    }
  }
  addImage = (i) => {
    if (this.props.addImage) {
      let src = this.props.addImage(i, this.props.message);
      let newMessage = [...this.state.message];
      newMessage[i].isShow = true;
      newMessage[i].img = src;
      this.setState({
        message: newMessage
      });
    }


  }
  delImage = (i) => {
    let newMessage = [...this.state.message];
    newMessage[i].isShow = false;
    newMessage[i].img = '';
    this.setState({
      message: newMessage
    });

    if (this.props.delImage) {
      return this.props.delImage();
    }
  }
  renderItems(i, value) {
    return (
      <div key={'imagePick' + i} className={styles.imageItems}>
        <p>{value.title}</p>
        <div className={styles.imageInfo}>
          {
            value.isShow ?
              <div className={styles.image}>
                <img src={value.img} alt="" />
                <span onClick={() => this.delImage(i)}>X</span>
              </div> :
              <div onClick={() => this.addImage(i)} className={styles.imageAdd}><span>+</span></div>
          }

        </div>
      </div>
    )
  }

  renderTypeBody = () => {
    // 类型  身份证  护照   变动项  显示图片数量 显示标题
    // 先判断类型 
    let data = this.state.message;
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      temp.push(this.renderItems(i, data[i]));
    }
    return (
      <div className={styles.containerInfo}>
        {temp}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTypeBody()}
      </div>
    );
  }
}
ImagePick.defaultProps = {
  type: 'idCard',
};
ImagePick.propTypes = {
  data: propTypes.array
};

export default ImagePick;
