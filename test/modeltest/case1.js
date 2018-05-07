

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
    it('should return success',(done)=>{
      superagent.post(serverUrl+'Sms/smsCode')
      .send({
        "phone":"18651833910",
        "type":1,
        "sign":"675",
        "modelId":"3839",
        "content":"{code}",
        "codeType":1
      })

      .end((err,res)=>{
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(1);
        expect(typeof res.body.result.data.smUuid).toEqual(string);
        done();
      })
    })

    it('should return pnone number error',()=>{
      superagent.post(serverUrl+'Sms/smsCode')
      .send({
        "phone":"1865183391",
        "type":1,
        "sign":"675",
        "modelId":"3839",
        "content":"{code}",
        "codeType":1
      })

      .end((err,res)=>{
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(0);
        expect(res.body.result.msg).toEqual('手机号码格式不正确');
        done();
      })
    })

    it('should return pnone number error',()=>{
      superagent.post(serverUrl+'Sms/smsCode')
      .send({
        "phone":"1865183391",
        "type":1,
        "sign":"675",
        "modelId":"3839",
        "content":"{code}",
        "codeType":1
      })

      .end((err,res)=>{
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result.code).toEqual(0);
        expect(res.body.result.msg).toEqual('手机号码格式不正确');
        done();
      })
    })
  
  
  })


});