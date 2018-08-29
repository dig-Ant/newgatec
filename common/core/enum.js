// let severIP = 'http://172.16.126.48';
let severIP = 'http://172.16.1.139';
// let severIP = 'http://47.98.205.89';

module.exports = {
  rangenum:{
    start:0,
    end:6
  },
  error:{
    statusCode:0,
    name:'错误',
    message:''
    
  },
  success:{
    code:1,
    msg:'成功',
    data:null,
  },
  smsCodeCheck:{//短信验证码模版
    phone:null,
    smsCode:null,
    status:0,
    codeType:null,
    
  },
  smsLogObj:{
    phone:null,
    smsCode:null,
    smsMsg:null,
    smsModelId:null,
    smsCodeId:null,
    smsSign:null
  },
  smsModel:{
    id:null,
    strArr:null
  },
  smsMsgObj:{
    id:null,
    txt:null,
    strArr:null
  },
  severURL:{
    get_is_client:severIP+':8888/api/inner/get_is_client'
  },
  inner_severIP:'http://localhost',
  // inner_severIP:'http://172.16.126.48'

};