let OSS = require('ali-oss');
let oss_data = require('./oss-data');
const client = new OSS({
  region: oss_data.region,// 华北2
  accessKeyId: oss_data.accessKeyId,
  accessKeySecret: oss_data.accessKeySecret
  // secure:false
});

module.exports = client;