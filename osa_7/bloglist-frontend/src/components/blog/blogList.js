import React from "react";
import Blog from "./blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, handleDelete, handleLike }) => {
  return blogs.map(b => {
    return (
      <div key={b.id}>
        <Blog blog={b} handleDelete={handleDelete} handleLike={handleLike} />
      </div>
    );
  });
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
};

export default BlogList;