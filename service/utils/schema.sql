DROP TABLE IF EXISTS chatlist;
DROP TABLE IF EXISTS conversation;

CREATE TABLE chatlist(
  chatId BIGINT NOT NULL,
  uid1 BIGINT NOT NULL,
  uid2 BIGINT NOT NULL,
  unread INT,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY chatlist
FROM '/home/ubuntu/chatlist.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE conversation(
  chatId BIGINT NOT NULL,
  messageId SERIAL,
  senderId BIGINT NOT NULL,
  body VARCHAR,
  photoUrl VARCHAR,
  read BOOLEAN DEFAULT 'f',
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY conversation
FROM '/home/ubuntu/conversation.csv'
DELIMITER ','
CSV HEADER;

CREATE UNIQUE INDEX cid ON chatlist(chatId);
-- CREATE UNIQUE INDEX chid ON conversation(chatId);