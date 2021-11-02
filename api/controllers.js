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
    if (!req.query.chatId || !req.query.messageId) {
      res.status(400).send('QUERY PARAM "chatId" and "messageId" ARE REQUIRED');
    }
    return db.deletePhoto(req.query)
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        res.status(400).send('UNABLE TO DELETE PHOTO - try again later');
      });
  },

  postNewConversation: (req, res) => {
    if (!req.body.senderId || !req.body.userId2) {
      res.status(400).send('MISSING INPUT - senderId, userId2, and (body or photo) are required');
      return;
    }
    return helpers.storePhoto(req)
      .then((photoData) => {
        let conversation = {};
        if (photoData != null) {
          conversation.senderId = req.body.senderId;
          conversation.userId2 = req.body.userId2;
          conversation.photo = photoData.Location;
        } else {
          conversation.senderId = req.body.senderId;
          conversation.userId2 = req.body.userId2;
          conversation.body = req.body.body;
        }
        return db.createNewConversation(conversation);
      })
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('UNABLE TO CREATE NEW CONVERSATION');
          return;
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send('UNABLE TO CREATE NEW CONVERSATION  - try again later');
      });




  },

  postNewMessage: (req, res) => {
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
    if (!req.body.chatId || !req.body.senderId) {
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
        console.log(err);
        res.status(400).send(err);
      });
  }
};

