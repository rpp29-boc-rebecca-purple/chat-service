const db = require('../service/index.js');
const helpers = require('./helpers');
const multer = require('multer');
const Aws = require('aws-sdk');

module.exports = {
  getChatlist: (req, res) => {
    if (!req.query.userId) {
      res.status(400).send('QUERY PARAM "userId" IS REQUIRED');
      return;
    }
    return db.getChatList(req.query.userId)
      .then((response) => {
        // console.log(response.rows);
        if (!response || response.rowCount === 0) {
          res.status(400).send('UNABLE TO GET CHAT LIST - try again later');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        // console.log('GET CHAT LIST ERR', err);
        res.status(400).send('UNABLE TO GET CHAT LIST - try again later');
      });
  },

  getConversation: (req, res) => {
    if (!req.query.chatId) {
      res.status(400).send('QUERY PARAM "chatId" IS REQUIRED');
      return;
    }
    return db.getConversation(req.query.chatId)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('UNABLE TO GET CONVERSATION - try again later');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        // console.log('GET CONVERSATION ERR', err);
        res.status(400).send('UNABLE TO GET CHAT LIST - try again later');
      });
  },

  putReadMessages: (req, res) => {
    res.send(200);
  },

  putDeletePhoto: (req, res) => {
    res.send(200);
  },

  postNewConversation: (req, res) => {
    db.createNewConversation(req.query)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('UNABLE TO CREATE NEW CONVERSATION');
          return;
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('UNABLE TO GET CHAT LIST - try again later');
      });

  },

  postNewMessage: (req, res) => {
    res.send(200);
  },

  postAddPhoto: (req, res) => {
    console.log(req);
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

