import React from "react";
import { useState } from "react";
import loginService from "../../services/loginService";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [detailsShown, setDetailsShown] = useState(false);

  const toggleDetails = () => {
    setDetailsShown(!detailsShown);
  };

  const style = {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid black"
  };

  const renderDeleteButton = () => {
    if(loginService.getLoggedInUser().username === blog.user.username) {
      return <button onClick={() => handleDelete(blog)}>Remove</button>;
    }
  };

  const renderBlogDetails = () => {
    if(detailsShown) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>Likes <span className="blogLikes">{blog.likes}</span> <button onClick={() => handleLike(blog.id)}>Like</button></p>
          <p>{blog.user.name}</p>
          {renderDeleteButton()}
        </div>
      );
    }
  };

  return (
    <div className="blog" style={style}>
      <p>{blog.title}, by {blog.author}
        <button onClick={toggleDetails}>{detailsShown ? "Hide" : "Show"}</button>
      </p>
      {renderBlogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  }),
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
};

export default Blog;