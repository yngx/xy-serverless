const AWS = require('aws-sdk');  
const stream = require('stream');

AWS.config.region = 'us-east-1'
const S3 = new AWS.S3()

class S3Handler {
  constructor() {}

  readHead(bucket) {
    return S3.headBucket({Bucket: bucket}, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('access available:' + data);
        }
    });
  }

  readStream({ Bucket, Key }) {
    return S3.getObject({ Bucket, Key }).createReadStream()
  }

  writeStream({ Bucket, Key }) {
    const passThrough = new stream.PassThrough()
    return {
      writeStream: passThrough,
      uploaded: S3.upload({
        ContentType: 'image/png',
        Body: passThrough,
        Bucket,
        Key
      }).promise()
    }
  }
}

module.exports = S3Handler;