DROP TABLE IF EXISTS chatlist;
DROP TABLE IF EXISTS conversation;

CREATE TABLE chatlist(
  chatId INT NOT NULL,
  uid1 INT NOT NULL,
  uid2 INT NOT NULL,
  unread INT,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY chatlist
FROM '/home/ubuntu/chatlist.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE conversation(
  chatId INT NOT NULL,
  messageId INT NOT NULL,
  senderId INT NOT NULL,
  body VARCHAR,
  photoUrl VARCHAR,
  read BOOLEAN,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY conversation
FROM '/home/ubuntu/conversation.csv'
DELIMITER ','
CSV HEADER;

CREATE UNIQUE INDEX cid ON chatlist(chatId);
-- CREATE UNIQUE INDEX chid ON conversation(chatId);