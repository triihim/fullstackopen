const _ = require("lodash");

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return [...blogs].sort((a, b) => a.likes < b.likes ? 1 : -1)[0];
};

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, b => b.author);
  return _.maxBy(Object.keys(counts), k => counts[k]);
};

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, "author");
  const authorLikes = [];
  for(const author in blogsByAuthor) {
    authorLikes.push({
      author: author, 
      likes: blogsByAuthor[author].reduce((likes, blog) => likes + blog.likes, 0)
    });
  }
  return _.maxBy(authorLikes, al => al.likes);
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};