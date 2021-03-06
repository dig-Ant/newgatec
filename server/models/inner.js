let jsonCheck = require('../../common/smsFn/jsonCheck');
let enums = require('../../common/core/enum');
let moment = require('moment');
let getFile = require('../../common/core/utilFn');
let buckets = require('../../common/util/oss/buckets');
let utilCheck = require('../../common/core/utilCheck');
let fs = require('fs');
let util_lv = require('../../common/core/util');
var writeFile = require('write');
let assert = require('assert');
moment.locale('zh-cn');
let oss_callback = require('../../common/util/oss/oss_callback');
const crypto = require('crypto');

module.exports = function(Inner) {


  Inner.testAnon = async function (obj, cb) {
    let result = 0;
    if(obj.test == '1'){
      result = 1;
    }
    return result;
    
  
    
  };

  Inner.smsCodeSend = async (obj,cb)=>{
    try {
      console.log(obj);
      let input = {
        phone:obj.phone,
        type:1,
        sign:'675',
        modelId:'3839',
        content:'{code}',
        codeType:1
      };
      let jsonKeys = ['phone'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.Sms.smsCode(input);
      return result;
      console.log('result===================>',result);
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412;
      cb(error);
    }
   
  };

  Inner.pay_smsCodeSend = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        type:1,
        sign:'675',
        modelId:'3839',
        content:'{code}',
        codeType:2
      };
      let jsonKeys = ['phone'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.Sms.smsCode(input);
      return result;
      console.log('result===================>',result);
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412;
      cb(error);
    }
   
  };
  Inner.smsCodeCheck = async (obj,cb)=>{
    
    try {
      console.log(obj);
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:1,
        status:0, 
        expirationTime:{gt: new Date()}
      };
        
      let jsonKeys = ['phone','code'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.SmsCode.findOne({where:input});
      console.log(result);
      if(result==null){
        let err = new Error('验证码错误');
        err.statusCode = 412;
        cb(err);
      }else{
        let smsUpdateStatus = await result.updateAttributes({status: 1 });
        console.log(enums.success);
        return enums.success;
      }
        
    } catch (error) {
      // enums.error.msg=error.message
     
      cb(error);
    }
  };

  Inner.pay_smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:2,
        status:0,
        expirationTime:{gt: new Date()}
      };
        
      let jsonKeys = ['phone','code'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.SmsCode.findOne({where:input});
      if(result==null){
        let err = new Error('验证码错误');
        err.statusCode = 412;
        cb(err);
      }else{
        let smsUpdateStatus = await Inner.app.models.SmsCode.updateAll({where:input}, { status: 1 });
        return enums.success;
      }
        
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412;
      cb(error);
    }
  };

  Inner.registerCodeCheck = async (obj,cb) =>{
    try {
      let input = {
        phone:obj.phone,
        smsCode:obj.code,
        codeType:1,
        status:0,
        expirationTime:{gt: new Date()}
      };
        
      let jsonKeys = ['phone','code'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.SmsCode.findOne({where:input});

      if(result==null){
        let err = new Error('验证码错误');
        err.statusCode = 412;
        cb(err);
      }else{
        console.log(result);
        return enums.success;
      }
        
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412;
      cb(error);
    }
  };
  Inner.groupSms = async () =>{
    try {
      
    } catch (error) {
      
    }
  };

  Inner.wechat_send= async(obj,cb) =>{
    try {
      let input = {
        openid:obj.openid,
        templateId:obj.templateId,
        url:obj.url,
        data:{
          'first': {
            'value':obj.header||'工资发放通知',
            'color':'#173177'
          },
          'keyword1':{
            'value':obj.cst_name,
            'color':'#173177'
          },
          'keyword2': {
            'value':obj.pay_time,
            'color':'#173177'
          },
          'keyword3': {
            'value':moment().format('LL'),
            'color':'#173177'
          },
          'remark':{
            'value':obj.footer||'感谢您的使用！',
            'color':'#173177'
          }
        }

      };
      let _send = Inner.app.models.WeChat_Log.wechat_send(input);
      return _send;
    } catch (error) {
      cb(error);
    }
  };

  Inner.wechat_send_arry= async(obj,cb) =>{
    try {
      let input = {
        openid:null,
        templateId:obj.templateId||'-hJINiqp9NbgsTb1vb8QPJDvKtAErroM7SZRJ80ydRM',
        url:obj.url,
        data:{
          'first': {
            'value':obj.header||'工资发放通知',
            'color':'#173177'
          },
          'keyword1':{
            'value':obj.clt_name,
            'color':'#173177'
          },
          'keyword2': {
            'value':obj.pay_time,
            'color':'#173177'
          },
          'keyword3': {
            'value':obj.notification_time||moment().format('LL'),
            'color':'#173177'
          },
          'remark':{
            'value':obj.footer||'感谢您的使用！',
            'color':'#173177'
          }
        }

      };
      let opArr = obj.openids.split(',');
      let errArr = [];
      let sucArr = [];
      for (let i = 0; i < opArr.length; i++) {

        input.openid = opArr[i];
        try {
          let _send =  await Inner.app.models.WeChat_Log.wechat_send(input);
          sucArr.push({openid:opArr[i],msgid:_send.msgid});
        } catch (error) {
          errArr.push(opArr[i]);
        }
           
      }
      
      return {
        success:sucArr,
        error:errArr,
      };
    } catch (error) {
      cb(error);
    }
  };

  Inner.file_up_test= async(req,cb)=>{
    try {
      // console.log(req.body.id);
      let _file = await getFile('fileData',req);
      let up_oss = await buckets.private_c.put('object-1112',_file.path);
      console.log(up_oss);
      // console.log(_file);
      return _file;
    } catch (error) {
      console.log(error);
    }
    
    
    // return 'ok';
  };
  
  Inner.file_download_test= (req,res,cb)=>{
 
    let oss_stream =  buckets.private_c.getStream('object-1112',).then((result)=>{
      console.log(result);
      let writeStream = fs.createReadStream('test.png');
      console.log(writeStream);   
      cb(null,writeStream, 'application/octet-stream' ,'attachment; filename=1.png');
    }).catch((e)=>{
      cb(e);
    });
     
  };

  Inner.smsSend = async (obj,cb)=>{
    try {
      console.log(obj);
      let input = {
        phone:obj.phone,
        type:2,
        sign:obj.sign,//签名
        modelId:obj.modelId,//模版
        content:obj.content
      };
      let jsonKeys = ['phone'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let result = await Inner.app.models.Sms.smsCode(input);
      return result;
      console.log('result===================>',result);
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412;
      cb(error);
    }
   
  };

  Inner.message_center = async (obj,cb)=>{
    try {
      console.log(obj);
      let jsonKeys = ['mc_method','business','platform'];
      let json_check = utilCheck.keysCheck(jsonKeys,obj);
      
      let mc_create = await Inner.app.models.Message_Center.create_mc(obj);
      return mc_create;
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };
  Inner.cst_backlist = async (obj,cb)=>{
    try {
      console.log(obj);
      let jsonKeys = ['cst_id'];
      let json_check = utilCheck.keysCheck(jsonKeys,obj);
      console.log(obj.channel==null&&obj.business==null); 
      if(obj.channel==null&&obj.business==null){
        let err = new Error('channel和business不能同时为空');
        err.statusCode = 412;
        throw err;
      }
      let cst_list = await Inner.app.models.Cst_Blacklist.upsert({
        cst_id:obj.cst_id,
        clt_id:obj.clt_id,
        business_id:obj.business,
        channel_id:obj.channel
      });
      
      return cst_list;
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };
  Inner.clt_backlist = async (obj,cb)=>{
    try {
      console.log(obj);
      let jsonKeys = ['clt_id'];
      let json_check = utilCheck.keysCheck(jsonKeys,obj);
      
      console.log(obj.channel==null&&obj.business==null); 
      if(obj.channel==null&&obj.business==null){
        let err = new Error('channel和business不能同时为空');
        err.statusCode = 412;
        throw err;
      }
      let clt_list = await Inner.app.models.Clt_Blacklist.upsert({ 
        clt_id:obj.clt_id,
        business_id:obj.business,
        channel_id:obj.channel
      });
      
      return clt_list;
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };
  Inner.ossSign = async (req,cb)=>{
    try {
      const {
        bucket,
        region,
        expAfter,
        maxSize,
        dirPath,
        accessKeyId,
        accessKeySecret,
        callbackIp,
        callbackPort,
        callbackPath
      } = oss_callback;
      const host = `http://${bucket}.${region}.aliyuncs.com`; //你的oss完整地址
      const expireTime = new Date().getTime() + expAfter;
      const expiration = new Date(expireTime).toISOString();
      const policyString = JSON.stringify({
        expiration,
        conditions: [
          ['content-length-range', 0, maxSize],
          ['starts-with', '$key', dirPath]
        ]
      });
      const policy = Buffer(policyString).toString('base64');
      const Signature = crypto.createHmac('sha1', accessKeySecret).update(policy).digest('base64');
      const callbackBody = {
        'callbackUrl': `http://${callbackIp}:${callbackPort}/${callbackPath}`,
        'callbackHost': `${callbackIp}`,
        'callbackBody': '{"filename": ${object},"size": ${size}}',
        'callbackBodyType': 'application/json'
      };
      const callback = Buffer(JSON.stringify(callbackBody)).toString('base64');
      return {
        Signature,
        policy,
        host,
        'OSSAccessKeyId': accessKeyId,
        'key': expireTime,
        'success_action_status': 200,
        dirPath,
        callback
      };
    } catch (error) {
      cb(error);
    }
  };

  Inner.private_file_up = async(req,cb)=>{
    try {
      // console.log(req.body.id);
      let _file = await getFile('fileData',req);
      // console.log(_file);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
      let file_too_big = await  Inner.app.models.File_Model.user_file_size(obj.user_id||0,_file.size,104857600);
      let object_key = util_lv.uuid();
      let up_oss = await buckets.private_c.put(object_key,_file.path);
      // console.log(_file.originalFilename.replace(/[\\\\/:*?\"<> |]/g, '_'));//文件名过滤
      let input = {
        id:object_key,
        user_id:0,
        bucket:'newgate-c-private',
        ext:_file.headers['content-type'],//文件扩展名
        size:_file.size,//文件大小
        access_type:1,//文件是否需要授权
        status:1,//文件的状态
        file_name:_file.originalFilename,//文件原始名
        requestUrls:up_oss.url,
        store_type:1 //文件存储方式

      };
      let sql_save = await Inner.app.models.File_Model.upsert(input);
      // console.log('sql_save',sql_save);
      console.log(up_oss);
      // console.log(_file);
      return {file_id:object_key};
    } catch (error) {
      console.log(error);
      cb(error);
    }
    
    
    // return 'ok';
  };

  Inner.public_file_up= async(req,cb)=>{
    try {
      // console.log(req.body.id);
      let _file = await getFile('fileData',req);
      console.log(_file);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
      let file_too_big = await  Inner.app.models.File_Model.user_file_size(obj.user_id||0,_file.size,104857600);
      let object_key = util_lv.uuid();
      let up_oss = await buckets.public_c.put(object_key,_file.path);
      let input = {
        id:object_key,
        user_id:0,
        bucket:'newgate-c-public',
        ext:_file.headers['content-type'],//文件扩展名
        size:_file.size,//文件大小
        access_type:0,//文件是否需要授权
        status:1,//文件的状态
        file_name:_file.originalFilename,//文件原始名
        requestUrls:up_oss.url,
        store_type:1 //文件存储方式

      };
      let sql_save = await Inner.app.models.File_Model.upsert(input);
      console.log('sql_save',sql_save);
      console.log(up_oss);
      // console.log(_file);
      return {file_id:object_key,url:up_oss.url};
    } catch (error) {
      console.log(error);
      cb(error);
    }
    
    
    // return 'ok';
  };
  Inner.get_file= (req,file_id,cb)=>{
    // console.log('req',req);
    
    let user_id = 0;
    let file_name = null;
    let writeStream = null;
    let get_file = Inner.app.models.File_Model.findOne({where:{id:file_id,status:1,user_id:user_id}}).then((result)=>{
      console.log('sql',result);
      if(result==null){
        throw new Error('文件不存在');
      }
      file_name = result.file_name;
     
      return buckets.private_c.get(file_id, 'download/'+result.file_name);
    }).then((result)=>{
      // console.log('oss',result);
      writeStream = fs.createReadStream('download/'+file_name);
      // console.log('write',writeStream);
      let fs_pro = util.promisify(fs.unlink.bind(this));
      return fs_pro('download/'+file_name);
      
    }).then((result)=>{
      console.log('file_name',file_name);
      let file_name_arr = file_name.split('.');
      let _name = file_id +'.'+ file_name_arr[file_name_arr.length-1];
      let disposition = 'attachment; filename='+_name;
      cb(null,writeStream, 'application/octet-stream' ,disposition);
    }).catch((error)=>{
      console.log(error);
      cb(error);
    });
  };

  Inner.private_file_base64_up = async(req,obj,cb)=>{
    try {
      let jsonKeys = ['data','file_name'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let base_arr = obj.data.split(',');
      let _header_base = base_arr[0].split(':');
      let _ext = _header_base[1].split(';')[0];
      console.log('ext',_ext);
      let base64_data = base_arr[1];
      var imageBuffer = new Buffer(base64_data,'base64');
      let _path = 'upload/'+obj.file_name;
      let write_file = await writeFile.promise(_path,imageBuffer);
      let fs_start = util.promisify(fs.stat.bind(this));
      let _file = await fs_start(_path);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
      let file_too_big = await  Inner.app.models.File_Model.user_file_size(obj.user_id||0,_file.size,104857600);
      let object_key = util_lv.uuid();
      let up_oss = await buckets.private_c.put(object_key,_path);
      
      console.log(_file);
      let input = {
        id:object_key,
        user_id:0,
        bucket:'newgate-c-private',
        ext:_ext,//文件扩展名
        size:_file.size,//文件大小
        access_type:1,//文件是否需要授权
        status:1,//文件的状态
        file_name:obj.file_name,//文件原始名
        requestUrls:up_oss.url,
        store_type:1 //文件存储方式

      };
      let sql_save = await Inner.app.models.File_Model.upsert(input);
      let fs_unlink = util.promisify(fs.unlink.bind(this));
      let file_del = await fs_unlink(_path);
      return {file_id:object_key};
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };

  Inner.public_file_base64_up = async(req,obj,cb)=>{
    try {
      let jsonKeys = ['data','file_name'];
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
      let base_arr = obj.data.split(',');
      let _header_base = base_arr[0].split(':');
      let _ext = _header_base[1].split(';')[0];
      console.log('ext',_ext);
      let base64_data = base_arr[1];
      var imageBuffer = new Buffer(base64_data,'base64');
      let _path = 'upload/'+obj.file_name;
      let write_file = await writeFile.promise(_path,imageBuffer);
      let fs_start = util.promisify(fs.stat.bind(this));
      let _file = await fs_start(_path);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
      let file_too_big = await  Inner.app.models.File_Model.user_file_size(obj.user_id||0,_file.size,104857600);
      let object_key = util_lv.uuid();
      let up_oss = await buckets.public_c.put(object_key,_path);
      
      console.log(_file);
      let input = {
        id:object_key,
        user_id:0,
        bucket:'newgate-c-public',
        ext:_ext,//文件扩展名
        size:_file.size,//文件大小
        access_type:0,//文件是否需要授权
        status:1,//文件的状态
        file_name:obj.file_name,//文件原始名
        requestUrls:up_oss.url,
        store_type:1 //文件存储方式

      };
      let sql_save = await Inner.app.models.File_Model.upsert(input);
      let fs_unlink = util.promisify(fs.unlink.bind(this));
      let file_del = await fs_unlink(_path);
      return {file_id:object_key,url:up_oss.url};
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };

  Inner.file_delete = async(req,obj,cb) =>{
    try {
      console.log('id',obj.file_id);
      let user_id = 0;
      let get_file = await Inner.app.models.File_Model.findOne({where:{
        id:obj.file_id,
        status:1,
        user_id:user_id
      }});
      if(get_file==null){
        throw new Error('文件不存在');
      }
      console.log('sql1',get_file);
      let del_file = await get_file.updateAttributes({status:0});
      let input = {
        file_id:obj.file_id,
        operation_type:0,
        model_name:get_file.file_name,
        user_id:user_id,
        file_id:get_file.id

      };
      let sql_save = await Inner.app.models.Change_History.upsert(input);
      console.log('sql',sql_save);
      return {state:1};
    } catch (error) {
      cb(error);
    }
  };
  Inner.ossCallback =  (obj,cb)=>{
    return {...obj};
  };
  Inner.remoteMethod('smsSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  
  Inner.remoteMethod('registerCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('pay_smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('pay_smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('wechat_send', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('wechat_send_arry', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('file_up_test', {
    http: {
      verb: 'post',
    },
    accepts: [ // get the id of the frog to save image to
    { arg: 'req', type: 'object', http: { source: 'req' } }],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('file_download_test', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}}
    ],
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: { target: 'header' }},
      {arg: 'Content-Disposition', type: 'string', http: { target: 'header' }}
    ],
    http: { verb: 'get'}
  });
  Inner.remoteMethod('message_center', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('cst_backlist', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('clt_backlist', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('ossSign', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}}
    ],
    returns: [
      {arg: 'body', type: 'object'}
    ],
    http: { verb: 'get'}
  });

  Inner.remoteMethod('ossCallback', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('private_file_up', {
    http: {
      verb: 'post',
    },
    accepts: [ // get the id of the frog to save image to
    { arg: 'req', type: 'object', http: { source: 'req' } }],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('public_file_up', {
    http: {
      verb: 'post',
    },
    accepts: [ // get the id of the frog to save image to
    { arg: 'req', type: 'object', http: { source: 'req' } }],

    returns: {arg: 'body', type: 'object'}
  });

  Inner.remoteMethod('get_file', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'file_id', type: 'string', http: {source:'query'}}
    ],
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: { target: 'header' }},
      {arg: 'Content-Disposition', type: 'string', http: { target: 'header' }}
    ],
    http: { verb: 'get'}
  });

  Inner.remoteMethod('private_file_base64_up', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('public_file_base64_up', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });
  Inner.remoteMethod('file_delete', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });

};