let OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shanghai',// 华北2
  accessKeyId: 'LTAILsBXWVclWJ9B',
  accessKeySecret: 'amlucjVmtUp8XjvzOR4p1z5nO1cd1Y'
  // secure:false
});

module.exports = client;