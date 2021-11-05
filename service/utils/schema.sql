DROP TABLE IF EXISTS conversation;
DROP TABLE IF EXISTS chatlist;

CREATE TABLE chatlist(
  chatId BIGINT UNIQUE NOT NULL,
  uid1 BIGINT NOT NULL,
  uid2 BIGINT NOT NULL,
  unread INT,
  unreadPhoto BOOLEAN DEFAULT 'f',
  lastSenderId BIGINT NOT NULL,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- COPY chatlist
-- FROM '/home/ubuntu/chatlist.csv'
-- DELIMITER ','
-- CSV HEADER;

CREATE TABLE conversation(
  messageId SERIAL,
  chatId BIGINT NOT NULL,
  senderId BIGINT NOT NULL,
  body VARCHAR,
  photoUrl VARCHAR,
  read BOOLEAN DEFAULT 'f',
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chatId) REFERENCES chatlist(chatId)
);

-- COPY conversation
-- FROM '/home/ubuntu/conversation.csv'
-- DELIMITER ','
-- CSV HEADER;

CREATE UNIQUE INDEX cid ON chatlist(chatId);
CREATE INDEX user1 ON chatlist(uid1);
CREATE INDEX user2 ON chatlist(uid2);
CREATE INDEX chid ON conversation(chatId);


