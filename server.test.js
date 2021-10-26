const app = require('./server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe ('testing JEST setup', () => {
  it('should add 2 and 2', async () => {
    expect(2 + 2).toBe(4);
  });
});