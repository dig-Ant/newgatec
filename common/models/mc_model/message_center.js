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
          let new_obj = await Message_Center.app.models.MC_Model.mc_additional(1,obj);//添加该渠道的附加属性
          let promArr = [];
          let usersArr = obj.users.split(',');
          let phoneArr = obj.phones.split(',');
          for (let i = 0; i < result.length; i++) {
            obj.phone = phoneArr[result[i]];
            
            promArr.push(Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],1,new_obj));//生成消息主题
          }
          let mc_objs = await Promise.all(promArr);
          console.log(mc_objs);
        }
        if (obj.mc_method.wechat == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(2,obj);
          mc_list.wechat = result;
          let new_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);
          let promArr = [];
          let usersArr = obj.users.split(',');
          let openidArr = obj.openids.split(',');
          for (let i = 0; i < result.length; i++) {
            obj.openid = openidArr[result[i]];
            
            promArr.push(Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],2,new_obj));//生成消息主题
          }
          let mc_objs = await Promise.all(promArr);
          console.log(mc_objs);
        }
        if (obj.mc_method.email == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(3,obj);
          mc_list.email = result;
          let new_obj = await Message_Center.app.models.MC_Model.mc_additional(2,obj);
          let promArr = [];
          let usersArr = obj.users.split(',');
          let emailArr = obj.emails.split(',');
          for (let i = 0; i < result.length; i++) {
            obj.email = emailArr[result[i]];
            
            promArr.push(Message_Center.app.models.MC_Model.create_mc(usersArr[result[i]],3,new_obj));//生成消息主题
          }
          let mc_objs = await Promise.all(promArr);
          console.log(mc_objs);
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