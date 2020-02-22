const supertest = require('supertest');
const router = require('./auth-router');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db.seed.run();
})

// POST - /api/auth/register
test("add a new user", async () => {
  const res = await supertest(server.use(router))
    .post('/api/auth/register')
    .send({ username: "tiffany90", password: "123456" });

    // Status Code
    expect(res.status).toBe(201)

    // Data Format
    expect(res.type).toBe("application/json")
})

// POST - /api/auth/login
test("login, no hashed password", async () => {
  const res = await supertest(server.use(router))
    .post('/api/auth/login')
    // Will not work, because password hasn't been hashed
    .send({ username: 'tiffany90', password: "123456" });

    // Status Code
    expect(res.status).toBe(404)

    // Data Format
    expect(res.type).toBe("application/json")
})