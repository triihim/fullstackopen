const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {type: String, required: true },
  author: {type: String, required: true },
  url: {type: String, required: true },
  likes: {type: Number, default: 0},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  comments: [
    {
      comment: { type: String, required: true }
    }
  ]
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    const comments = returnedObject.comments.map(c => {
      return {
        comment: c.comment,
        id: c._id.toString()
      };
    });
    returnedObject.comments = comments;
    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;