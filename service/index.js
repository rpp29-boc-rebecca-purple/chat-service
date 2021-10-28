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
      client.release();
      return null;
    });
};

module.exports.uploadPhoto = () => {

};

module.exports.addMessage = () => {

};

module.exports.readMessages = () => {

};

module.exports.deletePhoto = () => {

};


