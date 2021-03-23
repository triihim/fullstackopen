const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {type: String, required: true },
  author: {type: String, required: true },
  url: {type: String, required: true },
  likes: {type: Number, default: 0}
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;