const supertest = require('supertest');
const server = require('./api/server');

test("Welcome Route", async () => {
  const res = await supertest(server).get('/');

  // Status Code
  expect(res.status).toBe(200);

  // Data Format
  expect(res.type).toBe("application/json");

  // Expected Data
  expect(res.body.message).toMatch(/welcome/i);
})