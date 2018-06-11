import React, { Component } from 'react';
import styles from './Password.less';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      showNumber: 0
    }
  }
  componentDidMount(){
    this.input.focus();
  }
  onClick = () => {
    this.input.focus();
  }

  inputChange(a) {
    if (this.input.value.trim().length > this.props.count) {
      this.input.value = this.input.value.substr(0, this.props.count)
    }
    if (this.props.onChange) {
      this.props.onChange(a.target.value);
    }
    this.setState({
      showNumber: this.input.value.length,
    });
    // if (a.target.value.trim().length > 6) {
    //   a.target.value = a.target.value.substr(0, 6)
    // }
    // console.log('a...',a.target.value.length);
    // this.setState({
    //   showNumber: a.target.value.length,
    //   number: a.target.value
    // });
  }
  renderItems = () => {
    let tempArr = [];
    for (let i = 0; i < this.state.count; i++) {
      tempArr.push((
        <div
          key={'pwd' + i}
          className={styles.item}>
          { i < this.state.showNumber ? 
          <i className={styles.dot}></i>: null }
          
        </div>
      ));
    }
    return (
      <div
        onClick={this.onClick}
        className={styles.itemsbox}>
        {tempArr}
        <input
          //value={this.state.number}
          onChange={this.inputChange.bind(this)}
          ref={ref => this.input = ref}
          className={styles.input} type="number" />
      </div>
    )
  }
  render() {
    return (
      <div className={styles.container}>
        {this.renderItems()}
      </div>
    )
  }

}

Password.defaultProps = {
  count: 6
}
export default Password;