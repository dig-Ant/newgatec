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

let pArr = ['SmsLog','SmsCode']
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
// "phone":"18651833910",
// "type":1,
// "modelId":1,
// "strArr":["60"],
// "codeType":1
// }


// {
//   "phone":"18651833910",
//   "code":"844047",
//   "codeType":1
//   }