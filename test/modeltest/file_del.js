describe('file_base64_up', ()=> {


  it('should return file_id', (done)=> {
    
    console.log('path',__dirname);
    var options = {
      method: 'POST',
      uri: serverUrl+'private/file_delete',
      body: {
        file_id: '3716713312101121'
      },
      json: true // Automatically stringifies the body to JSON
    };
   
    rp(options)
      .then( (body)=> {
        console.log(JSON.parse(body));
        let result = JSON.parse(body);
        console.log(result.body.file_id);
        assert.notEqual(result.body.state,1,'不能为空');
      })
      .catch((err)=> {
          // POST failed...
        console.log(err);
      });
      
    done();
    
  });

  



  



});