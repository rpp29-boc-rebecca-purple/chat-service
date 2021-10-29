const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

module.exports.getChatList = (userId) => {
  const query = 'SELECT * FROM chatlist WHERE uid1=$1 OR uid2=$1;';
  const values = [userId];
  return pool.query(query, values)
    .catch((err) => {
      client.release();
      return null;
    });
};

module.exports.getConversation = (chatId) => {
  const query = 'SELECT * FROM conversation WHERE chatId=$1;';
  const values = [chatId];
  return pool.query(query, values)
    .catch((err) => {
      return null;
    });
};

module.exports.addPhoto = () => {

};

module.exports.createNewConversation = (data) => {
  let newPhoto, newBody;
  let newChatId = `${data.senderId}${data.userId2}`;
  newChatId = Number(newChatId);
  data.photo ? newPhoto = data.photo : newPhoto = null;
  data.body ? newBody = data.body : newBody = null;

  const query = 'INSERT INTO chatlist(chatId, uid1, uid2, unread) VALUES ($1, $2, $3, $4)';
  const values = [newChatId, data.senderId, data.userId2, 1];
  return pool.query(query, values)
    .then((response) => {
      const query = 'INSERT INTO conversation(chatId, senderId, body, photoUrl) VALUES ($1, $2, $3, $4)';
      const values = [newChatId, data.senderId, newBody, data.photo];
      return pool.query(query, values);
    })
    .then((response) => {
      const query = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values = [newChatId];
      return pool.query(query, values);
    })
    .catch((err) => {
      // console.log(err);
      if (err.detail && err.detail.includes('already exists')) {
        const query = 'SELECT * FROM conversation WHERE chatId=$1;';
        const values = [newChatId];
        return pool.query(query, values);
      } else {
        return null;
      }
    });
};

module.exports.addMessage = () => {

};

module.exports.readMessages = () => {

};

module.exports.deletePhoto = () => {

};


