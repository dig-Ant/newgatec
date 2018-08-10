describe('file_base64_up', ()=> {

  let _data = require('./_data');
  it('should return file_id', (done)=> {
    
    console.log('path',__dirname);
    var options = {
      method: 'POST',
      uri: serverUrl+'private/private_file_base64_up',
      body: {
        data: _data.data,
        file_name:'base64_test.png'
      },
      json: true // Automatically stringifies the body to JSON
    };
   
    rp(options)
      .then( (body)=> {
        console.log(JSON.parse(body));
        let result = JSON.parse(body);
        console.log(result.body.file_id);
        assert.notEqual(result.body.file_id,null,'不能为空');
      })
      .catch((err)=> {
          // POST failed...
        console.log(err);
      });
      
    done();
    
  });

  it('public should return url', (done)=> {
    
    console.log('path',__dirname);
    var options = {
      method: 'POST',
      uri: serverUrl+'private/public_file_base64_up',
      formData: {
          
        fileData: fs.createReadStream(__dirname + '/_file/test.png')
      },
      headers: {
        'content-type': 'multipart/form-data' // Is set automatically
      }
    };
   
    rp(options)
      .then( (body)=> {
        console.log(JSON.parse(body));
        let result = JSON.parse(body);
        console.log(result.body.file_id);
        assert.notEqual(result.body.url,null,'url不能为空');
      })
      .catch((err)=> {
          // POST failed...
        console.log(err);
      });
      
    done();
    
  });



  



});