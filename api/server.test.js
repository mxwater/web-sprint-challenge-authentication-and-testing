// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig'); 

test('sanity', () => {
  expect(true).toBe(true)
})


describe('server.js', () => {
  test('should be up and running', async () => {
    const res = await request(server).get('/api/auth');
    expect(res.status).toBe(404);
  });
});


test('responds with a "token required" message on missing token', async () => {
  const response = await request(server).get('/api/jokes'); // No token provided
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("token required");
});

test('responds with a "token invalid" message on invalid token', async () => {
  const response = await request(server)
    .get('/api/jokes')
    .set('Authorization', 'invalidtoken'); // Provide an invalid token
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("token invalid");
});




afterAll(async () => {
  await db.destroy(); 
});