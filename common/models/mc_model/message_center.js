let assert = require('assert');
let utilCheck = require('../../core/utilCheck');
module.exports = function(Message_Center) {

  Message_Center.create_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      let err = new Error('参数类型错误');
      let statusCode = 412;
      let res = {};
      try {
        
        let jsonCkeck = await Message_Center.app.models.MC_Model.mc_json_check(obj);//根据不同业务进行不同的字段验证
        // console.log(JSON.stringify(obj.mc_method)=='{}');
        assert.ok(JSON.stringify(obj.mc_method)!='{}',err);
        assert(typeof business!='number',err);
        assert(typeof platform!='string',err);
        let _batch = await Message_Center.app.models.MC_Batch.upsert({
          cst_id:obj.cst_id,
          platform:obj.platform,
          immediate:obj.immediate||1,
          data:obj,
          business_id:obj.business_id
        });
        let back_list = [];
        console.log('batch',_batch);
        obj.batch_id = _batch.id;
        let userArr = obj.users;
        let mc_list = {};
        if(obj.cst_id!=null){//判断公司是否对某种业务进行了全部屏蔽
          let result = await Message_Center.app.models.MC_Model.cst_back_list(obj);
          
        }


        if (obj.mc_method.sms == true) {
          
          let result = await Message_Center.app.models.MC_Model.back_list(1,obj);//黑白名单过滤
          mc_list.sms = result;
          back_list.concat(result.backlist);
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(1,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let phoneArr = obj.phones.split(',');
          
          for (let i = 0; i < result.whitelist.length; i++) {
            let phonecheck = utilCheck.phoneNumCheck(phoneArr[result.whitelist[i]]);//手机号码验证
            new_obj.phone = phoneArr[result.whitelist[i]];
            // console.log('phone',obj.phone);
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(_batch.id,usersArr[result.whitelist[i]],1,new_obj);//生成消息主题,是否直接发送或者进队列
            promArr.push(create_mc);
            // console.log(create_mc);
          }

          res.sms = promArr;
          
        }
        if (obj.mc_method.wechat == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(2,obj);
          mc_list.wechat = result;
          back_list.concat(result.backlist);
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let openidArr = obj.openids.split(',');
          
          
          for (let i = 0; i < result.whitelist.length; i++) {
            new_obj.openid = openidArr[result.whitelist[i]];
            
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(_batch.id,usersArr[result.whitelist[i]],2,new_obj);//生成消息主题,是否直接发送或者进队列
            promArr.push(create_mc);

            // console.log(create_mc);
          }
          res.wechat = promArr;
         
        }
        if (obj.mc_method.email == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(3,obj);
          mc_list.email = result;
          back_list.concat(result.backlist);//黑名单获取
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let emailArr = obj.emails.split(',');
          
          for (let i = 0; i < result.whitelist.length; i++) {
            new_obj.email = emailArr[result.whitelist[i]];
            
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(_batch.id,usersArr[result.whitelist[i]],3,new_obj);//生成消息主题,是否直接发送或者进队列
            promArr.push(create_mc);
            // console.log(create_mc);
          }
          res.email = promArr;
        }
        
        let batch_record = await Message_Center.app.models.Batch_Record.upsert({
          pass:1,
          intercept_list:back_list==null?null:back_list.join(','),
          data:obj,
          batch_id:_batch.id
        });
        // console.log('_batch.id',batch_record);
        resolve(res);
      } catch (error) {
        let batch_record = await Message_Center.app.models.Batch_Record.upsert({
          pass:0,
          message:JSON.stringify(error),
          data:obj,
          batch_id:obj.batch_id
        });
        reject(error);
      }
    });
  };

};