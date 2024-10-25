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

afterAll(async () => {
  await db.destroy(); 
});