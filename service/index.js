const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

module.exports.getChatList = (userId) => {
  pool
    .connect()
    .then((client) => {
      return client.query('SELECT * FROM chatlist WHERE uid1=$1 OR uid2=$1', [userId]);
    })
    .catch((err) => {
      console.log(err);
    });

};

module.exports.getConversation = () => {

};

module.exports.uploadPhoto = () => {

};

module.exports.addMessage = () => {

};

module.exports.readMessages = () => {

};

module.exports.deletePhoto = () => {

};


