const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  return res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user");
  return res.json(blog);
});

router.post("/", middleware.userExtractor, async (req, res) => {
  const user = await User.findById(req.user.id);

  const blogContent = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id
  };

  const blog = new Blog(blogContent);
  const createdBlog = await blog.save();
  
  user.blogs = user.blogs.concat(createdBlog._id);
  user.save();

  const populatedBlog = await Blog.findById(createdBlog._id).populate("user");

  return res.status(201).json(populatedBlog);
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if(!blog) return res.status(404).json({error: `no blog found with id ${req.params.id}`});

  const newContent = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: blog.user
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newContent, {new: true}).populate("user");
  return res.json(updatedBlog);
});

router.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if(req.user && blog.user && req.user.id.toString() === blog.user.toString()) {
    await blog.delete();
  } else {
    return res.status(401).json({ error: "only owners of the blog are allowed to delete it"});
  }

  return res.sendStatus(204);
});

module.exports = router;