let OSS = require('ali-oss');
const newgate_c_tast = new OSS({
  region: 'oss-cn-shanghai',// 华北2
  accessKeyId: 'LTAILsBXWVclWJ9B',
  accessKeySecret: 'amlucjVmtUp8XjvzOR4p1z5nO1cd1Y',
  bucket: 'newgate-c-tast-private',
  secure:false
});
module.exports = newgate_c_tast;