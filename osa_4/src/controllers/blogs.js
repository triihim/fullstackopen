const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const createdBlog = await blog.save();
  return res.status(201).json(createdBlog);
});

router.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
  return res.json(updatedBlog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
});

module.exports = router;