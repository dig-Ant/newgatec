let utilCheck = require('../../common/core/utilCheck');
let enums = require('../../common/core/enum');
let assert = require('assert');
module.exports = function(MC_Model) {

  MC_Model.method_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      try {
        let result = {};
        if (obj.mc_method.sms == true) {
          let _sms = await MC_Model.app.models.MC.sms_creat_mc(obj);
          // console.log('sms',_sms.body);
          result._sms = _sms.body;
        }
        if (obj.mc_method.wechat == true) {
          let _wechat = await MC_Model.app.models.MC.wechat_creat_mc(obj);
          // console.log('_wechat',_wechat);
          result._wechat = _wechat.body;
        }
        if (obj.mc_method.email == true) {
          let _email = await MC_Model.app.models.MC.email_creat_mc(obj);
          // console.log('_email',_email);
          result._email = _email.body;
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }

    });
  };

  MC_Model.mc_json_check= (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {

        let keysArr = [];
        
        if (obj.mc_method.sms == true) {
          let usersArr = obj.users.split(',');
          let phoneArr = obj.phones.split(',');
          assert(usersArr.length==phoneArr.length,new Error('电话号码参数错误,元素个数不一致'));
          let sms_keys = await MC_Model.app.models.Channel.findOne({where:{id:1}});
          keysArr = keysArr.concat(sms_keys.field.split(','));
        }
        if (obj.mc_method.wechat == true) {
          let usersArr = obj.users.split(',');
          let openidArr = obj.openids.split(',');
          
          assert(usersArr.length==openidArr.length,new Error('openid参数错误,元素个数不一致'));
          let sms_keys = await MC_Model.app.models.Channel.findOne({where:{id:2}});
          keysArr = keysArr.concat(sms_keys.field.split(','));
        }
        if (obj.mc_method.email == true) {
          let usersArr = obj.users.split(',');
          let emailArr = obj.emails.split(',');
          assert(usersArr.length==emailArr.length,new Error('email参数错误,元素个数不一致'));
          let sms_keys = await MC_Model.app.models.Channel.findOne({where:{id:3}});
          keysArr = keysArr.concat(sms_keys.field.split(','));
        }
        let business_keys = await MC_Model.app.models.Business.findOne({where:{id:obj.business}});
        keysArr = keysArr.concat(business_keys.field.split(','));
        // resolve(keysArr);
        let json_check = await utilCheck.keysCheck(keysArr,obj);
        resolve('ok'); 
      } catch (error) {
        
        console.log(error);
        reject(error);
      }
    });
  };
  MC_Model.back_list = (channel,obj) =>{
    return new Promise(async (resolve,reject)=>{
      try {
        let list_Arr ={};
        let blacklist = [];
        let whitelist = [];
        if(obj.cst_id!=null){//有企业id的时候
          let channel_cst_back_list_all = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
            cst_id:obj.cst_id,
            clt_id:null,
            channel_id:channel
        
          }});
          // console.log('channel_cst_back_list_all',channel_cst_back_list_all);
          if(channel_cst_back_list_all!=null){//企业是否屏蔽此种渠道
            resolve([]);
          }
          let usersArr = obj.users.split(',');
          
          // console.log('Arr',usersArr);
          for (let i = 0; i < usersArr.length; i++) {
            // console.log('cst',obj.cst_id);
            let channel_cst_back_list = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
              cst_id:obj.cst_id,
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:null
          
            }});
           
           
            let cst_back_list = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
              cst_id:obj.cst_id,
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:obj.business
          
            }});
            
            let business_cst_back_list = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
              
              cst_id:obj.cst_id,
              clt_id:usersArr[i],
              channel_id:null,
              business_id:obj.business
          
            }});

            
            let business_clt_back_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
              clt_id:usersArr[i],
              channel_id:null,
              business_id:obj.business
                
            }});
            let channel_clt_back_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
              
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:null
            }});
            let clt_back_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
             
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:obj.business
                
            }});

            if (clt_back_list==null&&cst_back_list==null&&
              channel_cst_back_list==null&&channel_clt_back_list==null&&
              business_cst_back_list==null&&business_clt_back_list==null
            ){
              whitelist.push(i);
            }else{
              backlist.push(usersArr[i]);
            }
            
          
          }

        }else{//无企业id的时候
          let usersArr = obj.users.split(',');
          for (let i = 0; i < usersArr.length; i++) {
            
            let back_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:obj.business
          
            }});
            let channel_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
              clt_id:usersArr[i],
              channel_id:channel,
              business_id:null
          
            }});
            let business_list = await MC_Model.app.models.Clt_Blacklist.findOne({where:{
              clt_id:usersArr[i],
              channel_id:null,
              business_id:obj.business
          
            }});
           
            
            if (business_list==null&&channel_list==null&&back_list==null){
              whitelist.push(i);
            }else{
              backlist.push(usersArr[i]);
            }
            

          }
        }
        list_Arr.whitelist = whitelist;
        list_Arr.blacklist = blacklist;
        resolve(list_Arr);
      } catch (error) {
        console.log('back_list',error);
        reject(error);
      }
      
      
      
    });
  };
  MC_Model.cst_back_list = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        
        let business_cst_back_list_all = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
            
          cst_id:obj.cst_id,
          business_id:obj.business,
          clt_id:null
          
      
        }});
        

        if(business_cst_back_list_all!=null){
          // console.log(business_cst_back_list_all);
          let err = new Error('该公司已屏蔽此种业务消息');
          err.statusCode = 412;
          throw err;
        }
       
        resolve('ok');
        
      } catch (error) {
        reject(error);
      }
    });
  };
  /**
   * 
   * @param {Array} clt_id_Arr 用户id的集合
   * @param {Number} channel 渠道id
   * @param {Object} obj 数据包
   */
  MC_Model.create_mc=(batch_id,clt_id,channel,obj)=>{
    return new Promise(async (resolve,reject)=>{
      // console.log('cst_id',obj.cst_id);
      try {
        // console.log({
          
        //   cst_id:obj.cst_id,
        //   platform_id:obj.platform_id,//平台id
        //   immediate:obj.immediate||0,
        //   data:JSON.stringify(obj),
        //   mc_type:obj.mc_type, //0.群发单体消息/1.群发模版消息
        //   channel_id:channel,
        //   business_id:obj.business});
        
        
        // console.log('cst_id',obj.cst_id);
        let _mc = await MC_Model.app.models.Message_Center.upsert({
          clt_id:clt_id,
          cst_id:obj.cst_id,
          platform:obj.platform,//平台id
          immediate:obj.immediate||1,//是否立即发送
          data:JSON.stringify(obj),
          mc_type:1, //0.群发单体消息/1.群发模版消息
          channel_id:channel,
          business_id:obj.business,
          batch_id:batch_id
        }); 
        if(obj.immediate==0){
          let _queue = await MC_Model.app.models.Queue.upsert({
            url:obj.url,
            data:JSON.stringify(obj),
            channel_id:channel,
            mc_id:_mc.id
          });
        }else{
          let result = await MC_Model.app.models.MC.mc_send(obj);
          // console.log(channel,result);
          let handle_mc = await _mc.updateAttributes({handle:1,handle_time:new Date()}); 
        }  
        
        resolve(_mc);
      } catch (error) {
        reject(error.error);
      }
    });
  };

  MC_Model.mc_additional=(channel,obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        let new_obj = await MC_Model.app.models.Additional.findOne({
          where:{
            channel_id:channel,
            business_id:obj.business
          }});
        obj.url = enums.inner_severIP + new_obj.url;
        obj = Object.assign(obj,JSON.parse(new_obj.data));//拼接两个对象,添加附加的属性
        resolve(obj);
      } catch (error) {
        reject(error);
      }
    });
  };

};
testFN = ()=>{
  return 'ok';
};