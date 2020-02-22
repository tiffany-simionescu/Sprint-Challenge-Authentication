const supertest = require('supertest');
const server = require('../api/server');
const router = require('./jokes-router');

test("get Dad jokes", async () => {
  const res = await supertest(server.use(router))
      .get('/api/jokes');

  // Status Code
  expect(res.status).toBe(400);

  // Data Format
  expect(res.type).toBe("application/json");
})