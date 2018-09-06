let oss_data = require('./oss-data');
module.exports = {
  
  dirPath: 'oss/file/', //oss 文件夹 不存在会自动创建
  bucket: 'newgate-c-private', //oss应用名
  region: 'oss-cn-hangzhou', //oss节点名
  accessKeyId: oss_data.accessKeyId, //osskey
  accessKeySecret: oss_data.accessKeySecret, //osssecret
  callbackIp: '47.98.205.89', //回调ip,一定要能被外网访问的地址,你可以暂时用这个...后台的代码和下面路由一致,不过不建议
  callbackPort: '33332', //回调端口
  callbackPath: 'api/inner/ossCallback', //回调接口
  expAfter: 60000, //签名失效时间
  maxSize: 10485760 //最大文件大小
};