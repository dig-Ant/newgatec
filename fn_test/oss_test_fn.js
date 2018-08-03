let client = require('../common/util/oss/oss_config');

_test_putBucket = async ()=>{
  try {
    // let result = await client.putBucket('newgate-c-tast-private');//创建bucket
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
    let result = await client.getBucketACL('newgate-c-tast-private');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// _test_bucket_acl();