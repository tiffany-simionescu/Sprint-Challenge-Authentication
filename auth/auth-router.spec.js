const supertest = require('supertest');
const router = require('./auth-router');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db.seed.run();
})

// POST - /api/auth/register
test("add a new user with no info provided", async () => {
  const res = await supertest(server.use(router))
    .post('/api/auth/register')
    // .send({ username: "tiffany87", password: "123456" });

    // Status Code
    expect(res.status).toBe(500)

    // Data Format
    expect(res.type).toBe("text/html")
})

// POST - /api/auth/login
test("login, no hashed password", async () => {
  const res = await supertest(server.use(router))
    .post('/api/auth/login')
    // Will not work, because password hasn't been hashed
    .send({ username: 'tiffany25', password: "123456" });

    // Status Code
    expect(res.status).toBe(404)

    // Data Format
    expect(res.type).toBe("application/json")
})