const db = require('../service');
const helpers = require('./helpers');
const multer = require('multer');
const Aws = require('aws-sdk');

module.exports = {
  getChatlist: (req, res) => {
    res.send(200);
  },

  getConversation: (req, res) => {
    res.send(200);
  },

  putReadMessages: (req, res) => {
    res.send(200);
  },

  putDeletePhoto: (req, res) => {
    res.send(200);
  },

  postAddPhoto: (req, res) => {
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
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send('error storing image');
      }
      res.status(201).send(data);
    });
  }
};

