var app = require('./server.js');

mc_check= async ()=>{
  try {
    let result = await app.models.Message_Center.create_mc(obj);
    // let result = await app.models.MC_Model.back_list(obj);
    console.log(result);

  } catch (error) {
    console.log(error);
  }
  
};
let obj = {
  mc_method:{
    sms:true,
    wechat:true
  },
  pay_time:'2018年7月',
  business:1,
  users:'11',
  phones:'18651833910',
  openids:'olFvj0zMTn2buSfANmU8LAp9f5eA',
  cst_id:1,
  header:'工资发放通知',
  cst_name:'上海才赋人力资源科技有限公司',
  footer:'感谢您的使用！',
  platform:'c',
  mc_type:1,
  immediate:1
};
mc_check(obj);

test_list = async()=>{
  try {
    let channel_cst_back_list = await app.models.Cst_Blacklist.findOne({where:{
      cst_id:1,
      clt_id:'4',
      channel_id:2

    }});
    console.log(channel_cst_back_list);
  } catch (error) {
    console.log(error);
  }
  
};

// test_list();