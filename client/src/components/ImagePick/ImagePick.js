import React from 'react';
import propTypes from 'prop-types';
import styles from './ImagePick.less';

class ImagePick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: [{
        title: '身份证姓名面:',
        img: '',
        isShow: false,
      }, {
        title: '身份证国徽面:',
        img: '123',
        isShow: false
      }]
    };
  }
  componentDidMount() {

  }
  componentWillReceiveProps(props) {
    let s = {
      idCardSide: 0,
      localData: '',
    }
    console.log(props.data);
    if (props.data[0].localData) {
      let newMsg = [...this.state.message];
      for (let i = 0; i < props.data.length; i++) {
        newMsg[props.data[i].idCardSide].img = props.data[i].localData;
        newMsg[props.data[i].idCardSide].isShow = true;
      }
      console.log('newmsg', newMsg);
      this.setState({
        message: newMsg
      });
    }

  }

  addImage = (i) => {
    if (this.props.addImage) {
      this.props.addImage(i, this.props.message);
      let newMessage = [...this.state.message];
      // newMessage[i].isShow = true;
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
      this.props.delImage(i);
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
  // data: propTypes.array
};

export default ImagePick;
