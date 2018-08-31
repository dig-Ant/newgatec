let jsonCheck = require('../../common/smsFn/jsonCheck');
let enums = require('../../common/core/enum');
let moment = require('moment');
let getFile = require('../../common/core/utilFn');
let buckets = require('../../common/util/oss/buckets');
let utilCheck = require('../../common/core/utilCheck');
let fs = require('fs');
let assert = require('assert');
moment.locale('zh-cn');

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
    // try {
      // console.log(req);
      // let _file = await getFile('fileData',req);
    let oss_stream =  buckets.private_c.getStream('object-1112',).then((result)=>{
      console.log(result);
      let writeStream = fs.createReadStream('test.png');
      console.log(writeStream);   
      cb(null,writeStream, 'application/octet-stream' ,'attachment; filename=1.png');
    }).catch((e)=>{
      cb(e);
    });
      // console.log(oss_stream);
      
    // } catch (error) {
    //   console.log(error);
    //   cb(error);
    // }
    
    
    // return 'ok';
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
};