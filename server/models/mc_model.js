let utilCheck = require('../../common/core/utilCheck');
module.exports = function(MC_Model) {

  MC_Model.method_creat_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{

      try {
        let result = {};
        if (obj.mc_method.sms == true) {
          let _sms = await MC_Model.app.models.MC.sms_creat_mc(obj);
          console.log('sms',_sms.body);
          result._sms = _sms.body;
        }
        if (obj.mc_method.wechat == true) {
          let _wechat = await MC_Model.app.models.MC.wechat_creat_mc(obj);
          console.log('_wechat',_wechat);
          result._wechat = _wechat.body;
        }
        if (obj.mc_method.email == true) {
          let _email = await MC_Model.app.models.MC.email_creat_mc(obj);
          console.log('_email',_email);
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
          let sms_keys = await MC_Model.app.models.Channel.findOne({where:{id:1}});
          keysArr = keysArr.concat(sms_keys.field.split(','));
        }
        if (obj.mc_method.wechat == true) {
          let sms_keys = await MC_Model.app.models.Channel.findOne({where:{id:2}});
          keysArr = keysArr.concat(sms_keys.field.split(','));
        }
        if (obj.mc_method.email == true) {
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
        let list_Arr =[];
        
        if(obj.cst_id!=null){//有企业id的时候
          let channel_cst_back_list_all = await MC_Model.app.models.Cst_Blacklist.findOne({where:{
            cst_id:obj.cst_id,
            clt_id:null,
            channel_id:channel
        
          }});
          console.log('channel_cst_back_list_all',channel_cst_back_list_all);
          if(channel_cst_back_list_all!=null){
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
              list_Arr.push(usersArr[i]);
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
              list_Arr.push(usersArr[i]);
            }
            

          }
        }
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
          console.log(business_cst_back_list_all);
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
};
testFN = ()=>{
  return 'ok';
};