let client = require('../common/util/oss/oss_config');
let buckets = require('../common/util/oss/buckets');
let fs = require('fs');
_test_putBucket = async ()=>{
  try {
    // let result = await client.putBucket('newgate-c-public');//创建bucket
    // console.log('bucket',result);
    let result1 = await client.listBuckets();
    console.log('all-bucket',result1);
    let result2 = await client.listBuckets({
      prefix: 'newgate',
    });
    console.log('bucket-newgate',result2);
  } catch (error) {
    console.log(error);
  }
}
// _test_putBucket();

_test_bucket_acl = async ()=>{
  try {
    // let result1 = await client.putBucketACL('newgate-c-public', 'oss-cn-shanghai', 'public-read');
    let result = await client.getBucketACL('newgate-c-public');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// _test_bucket_acl();

_test_bucket_dow = async ()=>{
  try {
    console.log('path',process.cwd())
    let result = await buckets.private_c.get('8298346694204840',__dirname+'/../download/test.png');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  
};

// _test_bucket_dow();

_test_delete_file = async ()=>{
  try {
    let del = await fs.unlink(__dirname+'/../download/test.png')
    console.log(del);
  } catch (error) {
    console.log(error);
  }
};
_test_delete_file();