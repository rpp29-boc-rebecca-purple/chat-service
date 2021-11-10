const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);
const dbQueries = require('./service/index.js');
jest.setTimeout(15000);


describe ('GET /conversation', () => {

  it('should respond with conversation data for valid chatId', async () => {
    const response = await request.get('/conversation?chatId=19&senderId=1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with a 400 status code for an invalid chatId', async () => {
    const response = await request.get('/conversation?chatId=999999');
    expect(response.status).toBe(400);
    expect(Array.isArray(response.body)).toBe(false);
  });

  it('should respond with a 400 status code for a missing chatId', async () => {
    const response = await request.get('/conversation');
    expect(response.status).toBe(400);
    expect(response.text).toBe('QUERY PARAM "chatId" and "senderId" ARE REQUIRED');
  });

});


describe ('GET /chatlist', () => {

  it('should respond with chatlist data for valid chatId', async () => {
    const response = await request.get('/chatlist?userId=1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with a 400 status code for an invalid chatId', async () => {
    const response = await request.get('/chatlist?userId=999999');
    expect(response.status).toBe(400);
    expect(Array.isArray(response.body)).toBe(false);
  });

  it('should respond with a 400 status code for a missing chatId', async () => {
    const response = await request.get('/chatlist');
    expect(response.status).toBe(400);
    expect(response.text).toBe('QUERY PARAM "userId" IS REQUIRED');
  });

});


describe ('POST /new-conversation', () => {

  it('should create a new conversation for the submitted users', async () => {
    const response = await request.post('/new-conversation').send({
      senderId: 1,
      userId2: 9,
      body: 'this is a test'
    });
    expect(response.status).toBe(200);
  });

  it('should respond with conversation data for existing conversations', async () => {
    const response = await request.post('/new-conversation').send({
      senderId: 1,
      userId2: 9,
      body: 'this is a test'
    });
    expect(response.status).toBe(200);
  });

  it('should respond with a 400 status code for a missing body parameters', async () => {
    const response = await request.post('/new-conversation');
    expect(response.status).toBe(400);
    expect(response.text).toBe('MISSING INPUT - senderId, userId2, and (body or photo) are required');
  });

});


describe ('POST /add-photo', () => {

  it('should respond with a 400 status code for a missing body parameters', async () => {
    const response = await request.post('/add-photo');
    expect(response.status).toBe(400);
    expect(response.text).toBe('MISSING INPUT - chatId, senderId, and photo are required');
  });

});


describe ('POST /add-message', () => {

  it('should add a message to an existing conversation between two users', async () => {
    const response = await request.post('/add-message').send({
      senderId: 9,
      chatId: 19,
      body: 'you are testing again!?'
    });
    expect(response.status).toBe(200);
  });

  it('should respond with a 400 status code for a missing body parameters', async () => {
    const response = await request.post('/add-message');
    expect(response.status).toBe(400);
    expect(response.text).toBe('MISSING INPUT - chatId, senderId, and body are required');
  });

});


describe ('POST /delete-photo', () => {

  it('should respond with a status of 400 for missing paramters', async () => {
    const response = await request.delete('/delete-photo');
    expect(response.status).toBe(400);
    expect(response.text).toBe('QUERY PARAM "chatId", "messageId", and "url" ARE REQUIRED');
  });

  it('should respond with a status of 400 for invalid messageIds', async () => {
    let addedMessage = 99999999;

    const response = await request.delete(`/delete-photo?chatId=12&messageId=${addedMessage}&url=test@test.jpg`);
    expect(response.status).toBe(400);
    expect(response.text).toBe('Submitted MessageID does not exist');
  });

});

describe ('DB queries (delete and add)', () => {
  it ('should return successfully for adding and deleting photos', async () => {
    const data = {
      chatId: 12,
      senderId: 1,
      photoURL: 'thisIsATest.jpg'
    };
    const response = await dbQueries.addPhoto(data);
    let messageIdNum = response.rows[response.rows.length - 1].messageid;
    console.log('what in the', messageIdNum);
    const dataToBeDeleted = {
      messageId: messageIdNum
    };
    const deleteResponse = await dbQueries.deletePhoto(dataToBeDeleted);
    expect(deleteResponse.rowCount).toBe(1);
  });
});
