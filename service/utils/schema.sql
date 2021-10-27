DROP TABLE IF EXISTS chatlist;
DROP TABLE IF EXISTS conversation;

CREATE TABLE chatlist(
  chatId INT PRIMARY KEY NOT NULL,
  uid1 INT NOT NULL,
  uid2 INT NOT NULL,
  unread INT,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY chatlist
FROM '/Users/willcasey/Desktop/CroutonChat/chat-service/service/chatlist-mock.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE conversation(
  chatId INT PRIMARY NOT NULL,
  messageId INT NOT NULL,
  senderId INT NOT NULL,
  body VARCHAR,
  photo BOOLEAN,
  photoUrl VARCHAR,
  read BOOLEAN,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COPY conversation
FROM '/Users/willcasey/Desktop/CroutonChat/chat-service/service/conversation-mock.csv'
DELIMITER ','


CREATE UNIQUE INDEX cid ON chatlist(chatId);
CREATE UNIQUE INDEX chid ON conversation(chatId);