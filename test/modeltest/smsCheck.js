describe('smsCheck', ()=> {
  describe('codeCheck', function() {
    it('should return formed error', (done)=> {
      superagent.post(serverUrl + 'Anons/smsCodeCheck')
      .send({
        
      })
      .end((err,res)=>{
        
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(0);
        expect(res.body.result.msg).toEqual('phone不能为空');
        done();
      })
    });
  })
  
  it('should return code is error', (done)=> {
    superagent.post(serverUrl + 'Anons/smsCodeCheck')
    .send({
      "phone":"18651833910",
      
      "code":"123456"
    })
    .end((err,res)=>{
      
      expect(err).toEqual(null);
      expect(res.status).toEqual(200);
      expect(res.body.result.code).toEqual(0);
      expect(res.body.result.msg).toEqual('验证码错误');
      done();
    })
  });

  // it('should return code is overdue', (done)=> {
  //   superagent.post(serverUrl + 'Anons/smsCodeCheck')
  //   .send({
  //     "phone":"18651833910",
  //    
  //     "code":"363821"
  //   })
  //   .end((err,res)=>{
      
  //     expect(err).toEqual(null);
  //     expect(res.status).toEqual(200);
  //     expect(res.body.result.code).toEqual(0);
  //     expect(res.body.result.msg).toEqual('验证码过期');
  //     done();
  //   })
  // });

  it('should return pnone number error', (done)=> {
    superagent.post(serverUrl + 'Anons/smsCodeCheck')
    .send({
      "phone":"1865183391",
     
      "code":"363821"
    })
    .end((err,res)=>{
      
      expect(err).toEqual(null);
      expect(res.status).toEqual(200);
      expect(res.body.result.code).toEqual(0);
      expect(res.body.result.msg).toEqual('1865183391 手机号码格式不正确');
      done();
    })
  });



})