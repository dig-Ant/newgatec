let jsonCheck = require('../../common/smsFn/jsonCheck')
let enums = require('../../common/core/enum')
let request = require('request');
let util = require('../util/util');
let getFile = require('../../common/core/utilFn');
let buckets = require('../../common/util/oss/buckets');
let fs = require('fs');
let util_lv = require('../../common/core/util');
var writeFile = require('write');
module.exports = function(Private) {


  Private.testAnon = async function (obj, cb) {
    let result = 0
    if(obj.test == '1'){
      result = 1
    }
      return result;
    
  
    
  }
/**
 * 仅用于用户激活时的验证码发送
 * @param {Object} obj 
 * @param {Object} cb 
 */
  Private.smsCodeSend = async (obj,cb)=>{
    try {
      let input = {
      phone:obj.phone,
      type:1,
      sign:"675",
      modelId:"3839",
      content:"{code}",
      codeType:1
      }
      let jsonKeys = ['phone','name']
      let requestRes = util.promisify(request.bind(this));
      let plant_check = await requestRes({
        method: "POST",
        url: enums.severURL.get_is_client,
        form: {
          name:obj.name,
          mobile:obj.phone
        }
      });
      if(JSON.parse(plant_check.body).body.result==0){
        console.log(plant_check.body);
        let err = new Error('您的手机或姓名不匹配')
        err.statusCode = 412;
        throw err; 
      }
      console.log(JSON.parse(plant_check.body).body.result);
      let objCheck = await jsonCheck.keysCheck(jsonKeys,obj)
      let result = await Private.app.models.Sms.smsCode(input);
      console.log(result);
      return result;
      
      // return plant_check.body;
    } catch (error) {
      // enums.error.msg=error.message
      // error.statusCode = 412
      cb(error)
    }
   
  }
  Private.smsCodeCheck = async (obj,cb)=>{
    try {
      let input = {
        phone:obj.phone,
        code:obj.code,
        codeType:1
        
        }
        let jsonKeys = ['phone','code']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Private.app.models.Sms.checkCode(input);
        console.log(result);
        return result;
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }
  
  Private.groupSms = async () =>{
    try {
      
    } catch (error) {
      
    }
  }

  Private.smsCodeGroup = async (obj,cb)=>{

       let sendTime = 10*1000*60
        let dateNow = new Date().getTime();
        let timeJson = new Date(dateNow+28800000+sendTime)
        let timeStr = timeJson.toJSON().slice(0, 19).replace('T', ' ')
    try {
      let input = {
        phones:obj.phones,
        sign:obj.sing||"675",
        modelId:obj.sing||"767",
        content:obj.content||'',
        time:obj.time||timeStr
        
        }
     
        
        let jsonKeys = ['phones']
        let objCheck = await jsonCheck.keysCheck(jsonKeys,obj);
        let result = await Private.app.models.Sms.groupSms(input);
        return result; 
    } catch (error) {
      // enums.error.msg=error.message
      error.statusCode = 412
      cb(error)
    }
  }

  Private.private_file_up = async(req,cb)=>{
    try {
      // console.log(req.body.id);
      let _file = await getFile('fileData',req);
      console.log(_file);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
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
      let sql_save = await Private.app.models.File_Model.upsert(input);
      console.log('sql_save',sql_save);
      console.log(up_oss);
      // console.log(_file);
      return {file_id:object_key};
    } catch (error) {
      console.log(error);
      cb(error);
    }
    
    
    // return 'ok';
  }

  Private.public_file_up= async(req,cb)=>{
    try {
      // console.log(req.body.id);
      let _file = await getFile('fileData',req);
      console.log(_file);
      if(_file.size>10485760){
        throw new Error('文件过大');
      }
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
      let sql_save = await Private.app.models.File_Model.upsert(input);
      console.log('sql_save',sql_save);
      console.log(up_oss);
      // console.log(_file);
      return {file_id:object_key,url:up_oss.url};
    } catch (error) {
      console.log(error);
      cb(error);
    }
    
    
    // return 'ok';
  }
  Private.get_file= (req,id,cb)=>{
    // console.log('req',req);
    console.log('id',id);
    let file_id = id;
    let user_id = 0;
    let file_name = null;
    let writeStream = null;
    let get_file = Private.app.models.File_Model.findOne({where:{id:file_id,status:1,user_id:user_id}}).then((result)=>{
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
      let file_name_arr = file_name.split(".");
      let _name = file_id +'.'+ file_name_arr[file_name_arr.length-1]
      let disposition = 'attachment; filename='+_name;
      cb(null,writeStream, 'application/octet-stream' ,disposition);
    }).catch((error)=>{
      console.log(error);
      cb(error)
    })
  }

  Private.private_file_base64_up = async(req,obj,cb)=>{
    try {
      let base_arr = obj.data.split(",");
      let _header_base = base_arr[0].split(":");
      let _ext = _header_base[1].split(";")[0];
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
      let sql_save = await Private.app.models.File_Model.upsert(input);
      let fs_unlink = util.promisify(fs.unlink.bind(this));
      let file_del = await fs_unlink(_path);
      return {file_id:object_key};
    } catch (error) {
      console.log(error);
      cb(error);
    }
  }

  Private.public_file_base64_up = async(req,obj,cb)=>{
    try {
      let base_arr = obj.data.split(",");
      let _header_base = base_arr[0].split(":");
      let _ext = _header_base[1].split(";")[0];
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
      let sql_save = await Private.app.models.File_Model.upsert(input);
      let fs_unlink = util.promisify(fs.unlink.bind(this));
      let file_del = await fs_unlink(_path);
      return {file_id:object_key,url:up_oss.url};
    } catch (error) {
      console.log(error);
      cb(error);
    }
  }

  Private.file_delete = async(req,obj,cb) =>{
    try {
      console.log('id',obj.file_id)
      let user_id = 0
      let get_file = await Private.app.models.File_Model.findOne({where:{
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
      let sql_save = await Private.app.models.Change_History.upsert(input);
      console.log('sql',sql_save);
      return {state:1}
    } catch (error) {
      cb(error);
    }
  }

  Private.remoteMethod('smsCodeSend', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('smsCodeCheck', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('smsCodeGroup', {
    accepts: [{arg: 'obj', type: 'object',http:{source:'body'}}],

    returns: {arg: 'body', type: 'object'}
  });

  Private.remoteMethod('private_file_up', {
    http: {
      verb: 'post',
    },
    accepts: [ // get the id of the frog to save image to
    { arg: 'req', type: 'object', http: { source: 'req' } }],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('public_file_up', {
    http: {
      verb: 'post',
    },
    accepts: [ // get the id of the frog to save image to
    { arg: 'req', type: 'object', http: { source: 'req' } }],

    returns: {arg: 'body', type: 'object'}
  });

  Private.remoteMethod('get_file', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'id', type: 'string', http: {source:'query'}}
    ],
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: { target: 'header' }},
      {arg: 'Content-Disposition', type: 'string', http: { target: 'header' }}
    ],
    http: { verb: 'get'}
  });

  Private.remoteMethod('private_file_base64_up', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('public_file_base64_up', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });
  Private.remoteMethod('file_delete', {
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'obj', type: 'object',http:{source:'body'}}
    ],

    returns: {arg: 'body', type: 'object'}
  });
}