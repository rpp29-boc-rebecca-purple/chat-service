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

  deletePhoto: (req, res) => {
    res.send(200);
  },

  postNewConversation: (req, res) => {
    if (!req.body.senderId || !req.body.userId2) {
      res.status(400).send('MISSING INPUT - senderId, userId2, and (body or photo) are required');
      return;
    }
    db.createNewConversation(req.body)
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
    console.log(req.body)
    if (!req.body.chatId || !req.body.senderId || !req.body.body) {
      res.status(400).send('MISSING INPUT - chatId, senderId, and body are required');
      return;
    }
    return db.addMessage(req.body)
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  postNewPhoto: (req, res) => {
    if (!req.body.chatId || !req.body.senderId || !req.body.photo) {
      res.status(400).send('MISSING INPUT - chatId, senderId, and photo are required');
      return;
    }
    const data = {
      chatId: req.body.chatId,
      senderId: req.body.senderId
    };
    return helpers.storePhoto(req)
      .then((photoData) => {
        data.photoURL = photoData.Location;
        return db.addPhoto(data);
      })
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};

