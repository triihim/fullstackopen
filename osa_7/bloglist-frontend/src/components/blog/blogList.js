import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const BlogList = ({ blogs }) => {

  const titleStyle = {
    margin: "20px 0"
  };

  const blogLinkStyle = {
    textDecoration: "none",
    color: "#333"
  };

  return blogs.map(b => {
    return (
      <div key={b.id}>
        <Typography variant="h6" style={titleStyle}>
          <Link to={`/blogs/${b.id}`} style={blogLinkStyle}>{b.title}</Link>
        </Typography>
      </div>
    );
  });
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object)
};

export default BlogList;