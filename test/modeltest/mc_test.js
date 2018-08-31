describe('mc_test', ()=> {

  
  it('Message_Center test,should return code 200', (done)=> {
    
    // console.log('path',__dirname);
    var options = {
      method: 'POST',
      uri: serverUrl+'inner/message_center',
      body:{
        mc_method:{
          sms:true,
          wechat:true
        },
        pay_time:'2018年7月',
        Payroll_time:'2018年8月15日',
        business:1,
        users:'12',
        phones:'18651833910,17512543910',
        openids:'olFvj0zMTn2buSfANmU8LAp9f5eA,olFvj0zMTn2buSfANmU8LAp9f5eA',
        cst_id:1,
        header:'工资发放通知',
        cst_name:'上海才赋人力资源科技有限公司',
        footer:'感谢您的使用！',
        platform:'c',
        mc_type:1,
        immediate:1
      },
      json: true // Automatically stringifies the body to JSON
    };
   
    rp(options)
      .then( (body)=> {
        // console.log('body',body);
        
        console.log('body',body.body);
        expect(body.body.error).toNotEqual(null);
        // assert.Equal(body.body.error,null,'接口未成功');
      })
      .catch((err)=> {
          // POST failed...
        console.log(err);
        throw err;
        
      });
      
    done();
    
  });

  // it('should return error', (done)=> {
    
  //   // console.log('path',__dirname);
  //   var options = {
  //     method: 'POST',
  //     uri: serverUrl+'inner/message_center',
  //     body:{
  //       mc_method:{
  //         sms:true,
  //         wechat:true
  //       },
  //       pay_time:'2018年7月',
  //       Payroll_time:'2018年8月15日',
  //       business:1,
  //       users:'11,12',
  //       phones:'1865183391,17512543910',
  //       openids:'olFvj0zMTn2buSfANmU8LAp9f5eA,olFvj0zMTn2buSfANmU8LAp9f5eA',
  //       cst_id:1,
  //       header:'工资发放通知',
  //       cst_name:'上海才赋人力资源科技有限公司',
  //       footer:'感谢您的使用！',
  //       platform:'c',
  //       mc_type:1,
  //       immediate:1
  //     },
  //     json: true // Automatically stringifies the body to JSON
      
  //   };
   
  //   rp(options)
  //     .then( (body)=> {
  //       // console.log(JSON.parse(body));
  //       // let result = JSON.parse(body);
  //       console.log('body',body.body);
  //       assert.Equal(body.body,null,'接口未发送成功');
  //     })
  //     .catch((err)=> {
  //         // POST failed...
  //       console.log(err);
  //     });
      
  //   done();
    
  // });



  



});