module.exports = function(Message_Center) {

  Message_Center.create_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        let jsonCkeck = await Message_Center.app.models.MC_Model.mc_json_check(obj);//根据不同业务进行不同的字段验证
        let userArr = obj.users;
        let mc_list = {};
        if(obj.cst_id!=null){//判断公司是否对某种业务进行了全部屏蔽
          let result = await Message_Center.app.models.MC_Model.cst_back_list(obj);
         
        }


        if (obj.mc_method.sms == true) {
          
          let result = await Message_Center.app.models.MC_Model.back_list(1,obj);//黑白名单过滤
          mc_list.sms = result;
          
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(1,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let phoneArr = obj.phones.split(',');
          for (let i = 0; i < result.length; i++) {
            
            new_obj.phone = phoneArr[result[i]];
            console.log('phone',obj.phone);
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],1,new_obj);//生成消息主题,是否直接发送或者进队列
            // console.log(create_mc);
          }
          
          
        }
        if (obj.mc_method.wechat == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(2,obj);
          mc_list.wechat = result;
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let openidArr = obj.openids.split(',');
          for (let i = 0; i < result.length; i++) {
            new_obj.openid = openidArr[result[i]];
            
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],2,new_obj);//生成消息主题
            console.log(create_mc);
          }
         
        }
        if (obj.mc_method.email == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(3,obj);
          mc_list.email = result;
          let characteristical_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);//添加该渠道的附加属性
          let new_obj = await Message_Center.app.models.MC.sms_creat_mc(characteristical_obj);//短信独有的数据操作组装
          let promArr = [];
          let usersArr = obj.users.split(',');
          let emailArr = obj.emails.split(',');
          for (let i = 0; i < result.length; i++) {
            new_obj.email = emailArr[result[i]];
            
            let create_mc = await Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],3,new_obj);//生成消息主题
            console.log(create_mc);
          }
          
        }
        //黑白名单过滤
        // console.log(mc_list);
        
         
        //创建消息主题
        //推送到队列或者直接发送

        resolve(mc_list);
      } catch (error) {
        reject(error);
      }
    });
  };

};