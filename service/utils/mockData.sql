INSERT INTO
  chatlist (chatId, uid1, uid2, unread, unreadPhoto, lastSenderId)
VALUES
  (12, 1, 2, 0, 'f', 2),
  (13, 1, 3, 1, 't', 3),
  (14, 1, 4, 2, 'f', 4),
  (15, 1, 5, 0, 'f', 1),
  (16, 1, 6, 0, 'f', 1);

INSERT INTO
  conversation (chatId, senderId, body, photoUrl, read)
VALUES
  (12, 1, 'barking meow, I just stubbed my paw', null, 't'),
  (12, 2, 'Language, please...', null, 't'),
  (13, 1, 'Have you heard from Mr. Meowgi??', null, 't'),
  (13, 3, 'Not since she went to the groomers...', null, 't'),
  (13, 3, null, 'https://croutonchat.s3.us-east-2.amazonaws.com/pets-anxiety.jpg', 'f'),
  (14, 1, 'How did the groomers go??', null, 't'),
  (14, 4, 'I look like a squirrel', null, 'f'),
  (14, 4, 'SQUIRREL!? where? who said that..', null, 'f'),
  (15, 1, 'Have you seen my tennis ball?', null, 't'),
  (16, 1, 'I heard them talking about going to dinner... I am never going to see them again am I?', null, 't');
