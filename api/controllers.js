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
        if (!response || response.rowCount === 0) {
          res.status(400).send('UNABLE TO GET CHAT LIST - try again later');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
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
        res.status(400).send('UNABLE TO GET CONVERSATION - try again later');
      });
  },

  putReadMessages: (req, res) => {
    res.send(200);
  },

  deletePhoto: (req, res) => {
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
        res.status(400).send('UNABLE TO CREATE NEW CONVERSATION  - try again later');
      });

  },

  postNewMessage: (req, res) => {
    res.send(200);
  },

  postNewPhoto: (req, res) => {
    const data = {
      chatId: req.body.chatId,
      senderId: req.body.senderId
    };
    return helpers.storePhoto(req)
      .then((photoData) => {
        console.log('PHOTO LOCATION', photoData.Location);
        data.photoURL = photoData.Location;
        return db.addPhoto(data);
      })
      .then((response) => {
        console.log('QUERY RESPONSE', response);
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        console.log('QUERY ERR', err);
        res.status(400).send(err);
      });
  }
};

