const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);

// describe ('testing JEST setup', () => {
//   it('should add 2 and 2', async () => {
//     expect(2 + 2).toBe(4);
//   });
// });

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

// describe ('POST /new-conversation', () => {

//   const payload = {
//     senderId: 234,
//     userId2: 432,
//     body: 'this is a test'
//   };

//   it('should create a new conversation for the submitted users', async () => {
//     request.post('/new-conversation', payload)
//       .set('Accept', 'application/json')
//       .expect(200, (response) => {
//         console.log('WHERE AM I?', response);
//         assert.equal(response.body.chatId, '234432');
//         done();
//       }
//       );
//     console.log(result);
//   });

  // it('should respond with conversation data for existing conversations', async () => {
  //   const response = await request.post('/new-conversation');
  //   expect(response.status).toBe(400);
  //   expect(Array.isArray(response.body)).toBe(false);
  // });

  // it('should respond with a 400 status code for a missing body parameters', async () => {
  //   const response = await request.post('/new-conversation');
  //   expect(response.status).toBe(400);
  //   expect(response.text).toBe('QUERY PARAM "userId" IS REQUIRED');
  // });

// });