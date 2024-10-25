const request = require('supertest');
const server = require('../server');
const db = require('../../data/dbConfig');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const testDb = knex(knexConfig.testing);

beforeAll(async () => {
    await db.migrate.latest(); 
  });
  
  beforeEach(async () => {
    await db('users').truncate(); 
  });
  
  afterAll(async () => {
    await db.destroy(); 
  });
describe('POST /register', () => {
  test('should register a new user successfully', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'newuser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'newuser');
    expect(response.body).toHaveProperty('password'); 
  });

  test('should fail if username or password is missing', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'newuser' }); 

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "username and password required" });
  });

  test('should fail if username is already taken', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'duplicateuser', password: 'password123' });

    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'duplicateuser', password: 'newpassword456' });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "username taken" });
  });
});
