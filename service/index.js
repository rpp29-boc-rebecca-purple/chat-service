const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

module.exports.getChatList = (userId) => {
  return pool
    .connect()
    .then((client) => {
      console.log('what the fuck', userId);
      const query = 'SELECT * FROM chatlist WHERE uid1=$1 OR uid2=$1;';
      const values = [userId];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

module.exports.getConversation = (chatId) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values = [chatId];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      return null;
    });
};

module.exports.uploadPhoto = () => {

};

module.exports.createNewConversation = (data) => {
  let newPhoto, newBody;
  let newChatId = `${data.userId1}${data.userId2}`;
  newChatId = Number(newChatId);
  data.photo ? newPhoto = data.photo : newPhoto = null;
  data.newBody ? newBody = data.body : newBody = null;
  console.log('here', newChatId);

  return pool
    .connect()
    .then((client) => {
      console.log('how');
      const query = 'INSERT INTO chatlist(chatId, uid1, uid2, unread) VALUES ($1, $2, $3, $4)';
      const values = [newChatId, data.userId1, data.userId2, 1];
      return client.query(query, values)
        .then((response) => {
          console.log('what in the');
          const query = 'INSERT INTO conversation(chatId, senderId, body, photoUrl) VALUES ($1, $2, $3, $4)';
          const values = [newChatId, data.userId1, newBody, data.photo];
          client.query(query, values);
        })
        .then((response) => {
          console.log('hell');
          const query = 'SELECT * FROM conversation WHERE chatId=$1;';
          const values = [newChatId];
          return client.query(query, values);
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
      return null;
    });
};

module.exports.addMessage = () => {

};

module.exports.readMessages = () => {

};

module.exports.deletePhoto = () => {

};


