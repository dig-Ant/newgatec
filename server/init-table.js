/**
 * 此文件为创建数据表的脚本
 * 需要单独运行此文件
 * 可以把需要用到的表名放入pArr数组
 * 会自动帮你创建这个表
 */

var app = require('./server.js');


  
creatTables = async (promiseArr)=>{

  await Promise.all(promseArr).then((res)=>{
    console.log('成功')
  }).catch((error)=>{
    console.log(error)
  })
}

let pArr = ['SmsCode','SmsLog']
let promseArr = []
  for (let index = 0; index < pArr.length; index++) {
    promseArr.push(app.dataSources.pgDs.automigrate(pArr[index]))
    
  }
creatTables(promseArr);

// function addDatetime(olddatetime,second){
//   var a = new Date(dd)
//   a = a.valueOf()
//   a = a + second * 1000
//   a = new Date(a)
//   return a;
// }

// {
//   "phone":"18651833910",
//   "type":1,
//   "sign":"675",
//   "modelId":"3839",
//   "content":"{code}",
//   "codeType":1
//   }

// {
//   "phones":["18651833910","1751254391"],
//   "sign":"675",
//   "modelId":"767",
//   "content":"",
//   "time":"2108-05-03 10-10-00"
//   }

// {
//   "phone":"18651833910",
//   "code":"844047",
//   "codeType":1
//   }

// let request = require('request');
// let util = require('../common/util/util');

// reqTest = async()=>{
//   let requestRes = util.promisify(request.bind(this));
//   let tokenResult =await requestRes({
//     method: "POST",
//     url: "http://api.1cloudsp.com/api/v2/single_send",
//     form: {
//       accesskey:'7xKGcAJzQVkKL5y8',
//       secret:'XZwZ35rEp1tld1BPvBgePVCQtPHcJ3VA',
//       sign:'675',
//       templateId:'3839',
//       mobile:'1865183391',
//       content:'1234556'
//     }
//   });
//   console.log(tokenResult.body)
// }
// reqTest ()

// let testArr = ['18651833910','1751254391']
// (async ()=>{
//   let gw = app.dataSources.groupSms;
//   try {
//     let result = await gw.gSms("7xKGcAJzQVkKL5y8", "XZwZ35rEp1tld1BPvBgePVCQtPHcJ3VA","675","767","18651833910,17512543910","","")
//     console.log(result)
//   } catch (error) {
//     console.log(error)
//   }
  
// })()
// app.dataSources.smsGw.sendSms("7xKGcAJzQVkKL5y8", "XZwZ35rEp1tld1BPvBgePVCQtPHcJ3VA","675","3839","18651833910","1234556", function(err,res){
// console.log(err),
// console.log(res)
// }
// )

// {
//   code: "0",
//   msg: "SUCCESS",
//   smUuid:"xxxx"
// }

// let moment = require('moment')
// let tenTime = moment().add(10, 'm');
// console.log(new Date(tenTime))