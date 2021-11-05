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
      return null;
    });
};

module.exports.getConversation = (chatId) => {
  const query = 'UPDATE conversation SET read=true WHERE chatId=$1 AND read=false;';
  const values = [chatId];
  return pool.query(query, values)
    .then((response) => {
      const query2 = 'UPDATE chatlist SET unread=0 WHERE chatId=$1 RETURNING *;';
      const values2 = [chatId];
      return pool.query(query2, values2);
    })
    .then((response) => {
      const query3 = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values3 = [chatId];
      return pool.query(query3, values3);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

module.exports.createNewConversation = (data) => {
  let newChatId = `${data.senderId}${data.userId2}`;
  newChatId = Number(newChatId);
  let query, query2, values, values2;

  if (data.body) {
    query = 'INSERT INTO chatlist(chatId, uid1, uid2, unread, unreadPhoto, lastSenderId) VALUES ($1, $2, $3, $4, $5, $6)';
    values = [newChatId, data.senderId, data.userId2, 1, false, data.senderId];

    query2 = 'INSERT INTO conversation(chatId, senderId, body) VALUES ($1, $2, $3)';
    values2 = [newChatId, data.senderId, data.body];
  } else {
    query = 'INSERT INTO chatlist(chatId, uid1, uid2, unread, unreadPhoto, lastSenderId) VALUES ($1, $2, $3, $4, $5, $6)';
    values = [newChatId, data.senderId, data.userId2, 1, true, data.senderId];

    query2 = 'INSERT INTO conversation(chatId, senderId, photoUrl) VALUES ($1, $2, $3)';
    values2 = [newChatId, data.senderId, data.photo];
  }

  return pool.query(query, values)
    .then((response) => {
      return pool.query(query2, values2);
    })
    .then((response) => {
      const query3 = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values3 = [newChatId];
      return pool.query(query3, values3);
    })
    .catch((err) => {
      if (err.detail && err.detail.includes('already exists')) {
        const query4 = 'SELECT * FROM conversation WHERE chatId=$1;';
        const values4 = [newChatId];
        return pool.query(query4, values4);
      } else {
        console.log(err);
        return null;
      }
    });
};

module.exports.addPhoto = (data) => {
  const query = 'INSERT INTO conversation (chatId, senderId, photoUrl) VALUES ($1, $2, $3)';
  const values = [data.chatId, data.senderId, data.photoURL];
  return pool.query(query, values)
    .then((response) => {
      const query2 = 'UPDATE chatlist SET unread=unread + 1, unreadPhoto=true, lastSenderId=$2, time=CURRENT_TIMESTAMP WHERE chatId=$1;';
      const values2 = [data.chatId, data.senderId];
      return pool.query(query2, values2);
    })
    .then((response) => {
      const query3 = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values3 = [data.chatId];
      return pool.query(query3, values3);
    })
    .catch((err) => {
      return null;
    });
};

module.exports.addMessage = (data) => {
  const query = 'INSERT INTO conversation (chatId, senderId, body) VALUES ($1, $2, $3)';
  const values = [data.chatId, data.senderId, data.body];
  return pool.query(query, values)
    .then((response) => {
      const query2 = 'UPDATE chatlist SET unread = unread+1, lastSenderId = $2, time = CURRENT_TIMESTAMP WHERE chatId=$1;';
      const values2 = [data.chatId, data.senderId];
      return pool.query(query2, values2);
    })
    .then((response) => {
      const query3 = 'SELECT * FROM conversation WHERE chatId=$1;';
      const values3 = [data.chatId];
      return pool.query(query3, values3);
    })
    .catch((err) => {
      return null;
    });
};

module.exports.deletePhoto = (data) => {
  const query = 'DELETE FROM conversation WHERE messageId=$1;';
  const values = [data.messageId];
  return pool.query(query, values)
    .then((response) => {
      if (response.rowCount === 0) {
        return 'noID';
      }
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getAfterDelete = (chatId) => {
  const query = 'SELECT * FROM conversation WHERE chatId=$1;';
  const values = [chatId];
  return pool.query(query, values)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};





