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
let obj = {mc_method:{
  sms:true,
  wechat:true
},
  business:1,
  users:'1,2,3,4,5,6,7,8',
  cst_id:1
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