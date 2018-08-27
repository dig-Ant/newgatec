module.exports = function(Message_Center) {

  Message_Center.create_mc = (obj)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        // let jsonCkeck = await Message_Center.app.models.MC_Model.mc_json_check(obj);//根据不同业务进行不同的字段验证
        let userArr = obj.users;
        let mc_list = {};
        if(obj.cst_id!=null){//判断公司是否对某种业务进行了全部屏蔽
          let result = await Message_Center.app.models.MC_Model.cst_back_list(obj);
         
        }


        if (obj.mc_method.sms == true) {
          
          let result = await Message_Center.app.models.MC_Model.back_list(1,obj);
          mc_list.sms = result;
          // console.log(result);
        }
        if (obj.mc_method.wechat == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(2,obj);
          mc_list.wechat = result;
        }
        if (obj.mc_method.email == true) {
          let result = await Message_Center.app.models.MC_Model.back_list(3,obj);
          mc_list.email = result;
        }
        //黑白名单过滤
        // console.log(mc_list);
        resolve(mc_list);
         
        //创建消息主题
        //推送到队列或者直接发送
      } catch (error) {
        reject(error);
      }
    });
  };

};