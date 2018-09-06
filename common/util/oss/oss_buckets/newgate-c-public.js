let OSS = require('ali-oss');
let oss_data = require('../oss-data');
const newgate_c_tast = new OSS({
  region: oss_data.region,// 华东2
  accessKeyId: oss_data.accessKeyId,
  accessKeySecret: oss_data.accessKeySecret,
  bucket: 'newgate-c-public',
  secure:false
});
module.exports = newgate_c_tast;