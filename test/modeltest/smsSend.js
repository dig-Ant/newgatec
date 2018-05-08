

var assert = require('assert');


describe('sms', function() {
  describe('Greet', function() {
    it('should return a greet', (done)=> {
      superagent.post(serverUrl + 'Sms/greet')
      .send({
        "test":"1"
      })
      .end((err,res)=>{
        
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result).toEqual(1);
        done();
      })
    });
  });

  describe('smsCode',() =>{
    // it('should return success',(done)=>{
    //   superagent.post(serverUrl+'Anons/smsCodeSend')
    //   .send({
    //     "phone":"18651833910",
    //   })

    //   .end((err,res)=>{
    //     console.log(err)
    //     expect(err).toEqual(null);
    //     expect(res.status).toEqual(200);
    //     expect(res.body.result.code).toEqual(1);
    //     expect(typeof res.body.result.data.smUuid == 'string').toEqual(true);
    //     done();
    //   })
    // })

    it('should return pnone number error',()=>{
      superagent.post(serverUrl+'Anons/smsCodeSend')
      .send({
        "phone":"1865183391",
        
      })

      .end((err,res)=>{
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(0);
        expect(res.body.result.msg).toEqual('1865183391 手机号码格式不正确');
        done();
      })
    })

    it('should return formed error',()=>{
      superagent.post(serverUrl+'Anons/smsCodeSend')
      .send({
        
        
      })
      .end((err,res)=>{
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(0);
        expect(res.body.result.msg).toEqual('phone不能为空');
        done();
      })
    })
    
  
  })


});