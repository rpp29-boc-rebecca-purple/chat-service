const multer = require('multer');
const Aws = require('aws-sdk');

module.exports = {

  filefilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },

  storePhoto: (req) => {

    return new Promise((resolve, reject) => {
      if (!req.file) {
        resolve(null);
      }
      console.log(req.file);
      const s3 = new Aws.S3({
        accessKeyId: process.env.AWSKEY,
        secretAccessKey: process.env.AWSSECRET
      });
      const params = {
        Bucket: process.env.AWSBUCKET,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg'
      };
      s3.upload(params, (err, result) => {
        if (err) {
          console.log(err);
          reject(null);
        }
        resolve(result);
      });
    });
  }
};