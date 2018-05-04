var assert = require('assert');


describe('sms', function() {
  describe('Greet', function() {
    it('should return a greet', (done)=> {
      superagent.post(serverUrl + 'Sms/greet')
      .send({
        "test":"1"
      })
      .end((err,res)=>{
        expect(err)
        expect(err).toEqual(null);
        expect(res.status).toEqual(200);
        expect(res.body.result).toEqual(1);
        done();
      })
    });
  });
});