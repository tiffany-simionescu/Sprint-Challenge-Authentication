const userModel = require('./auth-model');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db.seed.run();
})

describe("users model", () => {
   
  test("findById", async () => {
    const res = await userModel.findById(1);
    expect(res.username).toBe("tiffany25")
  })

  test("add", async () => {
    await userModel.add({ username: "Tiffany88", password: "123456" })
    const users = await db("users").select();
    expect("users").toHaveLength(5)
  })

  test("findBy", async () => {
    const user = await userModel.findBy({ username: "tiffany25" })
    expect(user).toEqual([{ "id": 1, "password": "123456", "username": "tiffany25" }])
  })

  test("find", async () => {
    const res = await userModel.find();
    expect(res.length).toBeGreaterThan(0);
  })
})