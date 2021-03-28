const app = require("../src/app");
const supertest = require("supertest");
const helper = require("./testHelper");
const mongoose = require("mongoose");
const User = require("../src/models/user");

const api = supertest(app);

describe("Users api tests", () => {

  beforeEach(async () => {
    await User.deleteMany({ username: { $not: /testuser/ } });
    const usersToSave = helper.initialUsers.map(u => new User(u));
    const savePromises = usersToSave.map(u => u.save());
    await Promise.all(savePromises);
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  test("User can be created", async () => {
    const newUser = {
      username: "newuser",
      password: "12345"
    };

    const userCountBefore = await User.count({});

    const result = await api.post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(result.body.username).toEqual(newUser.username);

    const userCountAfter = await User.count({});

    expect(userCountAfter).toEqual(userCountBefore + 1);
  });

  test("Non unique user cannot be created", async () => {
    const newUser = {
      username: helper.initialUsers[0].username, // duplicate username
      password: "12345"
    };

    await api.post("/api/users")
      .send(newUser)
      .expect(400);
  });

});