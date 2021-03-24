const Blog = require("../src/models/blog");
const User = require("../src/models/user");
const helper = require("./testHelper");
const app = require("../src/app");
const supertest = require("supertest");

const api = supertest(app);

const getAllBlogs = async () => {
  return await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/);
};

describe("Blogs api tests", () => {

  let token;
  beforeAll(async (done) => {
    const testUserExists = await User.exists({username: "testuser"});
    if(!testUserExists) {
      await api.post("/api/users").send(helper.testUser).expect(201);
    } 

    const loginResponse = await api.post("/api/login").send(helper.testUser).expect(200);
    token = loginResponse.body.token;
    done();
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogsToSave = helper.initialBlogs.map(b => new Blog(b));
    const blogSavePromises = blogsToSave.map(b => b.save());
    await Promise.all(blogSavePromises);
  });
  
  afterAll((done) => {
    console.log("Closing DB connection");
    require("mongoose").connection.close();
    done();
  });
  
  test("All blogs returned as JSON", async () => {
    const response = await getAllBlogs();
    expect(response.body.length).toEqual(helper.initialBlogs.length);
  });

  test("Returned blogs have id-property", async () => {
    const response = await getAllBlogs();
    expect(response.body[0].id).toBeDefined();
  });

  test("Blog can be created", async () => {
    const newBlog = {
      title: "new blog",
      author: "test author",
      url: "http://google.com",
      likes: 5
    };

    const response = await api.post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Can't check with toContainEqual since the some props are changed in toJSON.
    expect(response.body.title).toEqual(newBlog.title);
    expect(response.body.author).toEqual(newBlog.author);
    expect(response.body.url).toEqual(newBlog.url);
    expect(response.body.likes).toEqual(newBlog.likes);

    const allBlogsResponse = await getAllBlogs();
    expect(allBlogsResponse.body.length).toEqual(helper.initialBlogs.length + 1);
  });

  test("Undefined likes field is set to zero", async () => {
    const newBlog = {
      title: "new blog",
      author: "test author",
      url: "http://google.com",
    };

    const response = await api.post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("Undefined title and author results in bad request", async () => {
    await api.post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);
  });

  test("Blog can be deleted", async () => {
    // Create a blog to have authorization to delete it.
    const newBlog = {
      title: "to be deleted",
      author: "test author",
      url: "http://google.com"
    };

    const blogPostResposne = await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(201);
    const blogsAfterPost = await getAllBlogs();
    expect(blogsAfterPost.body.length).toEqual(helper.initialBlogs.length + 1);

    await api.delete(`/api/blogs/${blogPostResposne.body.id}`).set("Authorization", `Bearer ${token}`).expect(204);
    const blogsAfterDelete = await getAllBlogs();
    expect(blogsAfterDelete.body.length).toEqual(helper.initialBlogs.length);
  });

  test("Blog cannot be created without a token", async () => {
    const newBlog = {
      title: "new blog",
      author: "test author",
      url: "http://google.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("Blog likes can be updated", async () => {
    const existingBlog = helper.initialBlogs[0];
    const updatedBlog = {
      title: existingBlog.title,
      author: existingBlog.author,
      url: existingBlog.url,
      likes: existingBlog.likes + 1
    };
    const result = await api.put(`/api/blogs/${existingBlog._id.toString()}`).send(updatedBlog).expect(200).expect("Content-Type", /application\/json/);
    expect(result.body.likes).toEqual(existingBlog.likes + 1);
    expect(result.body.id).toEqual(existingBlog._id.toString());
    expect(result.body.title).toEqual(existingBlog.title);
    expect(result.body.author).toEqual(existingBlog.author);
    expect(result.body.url).toEqual(existingBlog.url);
  });

});