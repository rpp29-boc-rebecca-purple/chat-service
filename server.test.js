const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe ('GET /conversation', () => {

  it('should respond with conversation data for valid chatId', async () => {
    const response = await request.get('/conversation?chatId=1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with a 400 status code for an invalid chatId', async () => {
    const response = await request.get('/conversation?chatId=999');
    expect(response.status).toBe(400);
    expect(Array.isArray(response.body)).toBe(false);
  });

  it('should respond with a 400 status code for a missing chatId', async () => {
    const response = await request.get('/conversation');
    expect(response.status).toBe(400);
    expect(response.text).toBe('QUERY PARAM "chatId" IS REQUIRED');
  });

});

describe ('GET /chatlist', () => {

  it('should respond with chatlist data for valid chatId', async () => {
    const response = await request.get('/chatlist?userId=1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with a 400 status code for an invalid chatId', async () => {
    const response = await request.get('/chatlist?userId=999');
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
      senderId: 234,
      userId2: 432,
      body: 'this is a test'
    });
    expect(response.status).toBe(200);
  });

  it('should respond with conversation data for existing conversations', async () => {
    const response = await request.post('/new-conversation').send({
      senderId: 234,
      userId2: 432,
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

  it('should respond with a 400 status code for a missing body parameters', async () => {
    const response = await request.post('/add-message');
    expect(response.status).toBe(400);
    expect(response.text).toBe('MISSING INPUT - chatId, senderId, and body are required');
  });

});