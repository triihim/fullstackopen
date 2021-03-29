import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../../reducers/blogsReducer";
import { useHistory } from "react-router";
import { Button, Paper, TextField, Typography } from "@material-ui/core";

const Blog = ({ blog }) => {
  if(!blog) return <p>Blog not found</p>;

  const canDelete = useSelector(state => state.users.loggedInUser.name === blog.user.name);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleBlogDelete = (blog) => {
    if(window.confirm(`Are you sure you want to delete blog: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id, () =>  history.push("/")));
    }
  };

  const handleBlogLike = async (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const renderDeleteButton = () => {
    if(canDelete) {
      return <Button color="secondary" onClick={() => handleBlogDelete(blog)}>Remove</Button>;
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if(comment.length < 1) {
      alert("Can't send an empty comment");
    } else {
      dispatch(commentBlog(blog.id, comment));
      e.target.comment.value = "";
    }
  };

  return (
    <div className="blog" style={{ marginBottom: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        {blog.title}, by {blog.author}
      </Typography>
      <div>
        <Typography paragraph>{blog.url}</Typography>
        <Typography paragraph className="blogLikes">Likes {blog.likes}</Typography>
        <Typography paragraph>Added by {blog.user.name}</Typography>
        <Button variant="outlined" onClick={() => handleBlogLike(blog.id)}>Like</Button>
        {renderDeleteButton()}
      </div>
      <Typography style={{ margin: "10px 0" }} variant="h5">Comments</Typography>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <TextField multiline variant="outlined" style={{ width: "100%" }} name="comment" label="Comment" />
        </div>
        <Button style={{ marginTop: "10px" }} color="primary" variant="contained" type="submit">Add comment</Button>
      </form>
      <div>
        {blog.comments && blog.comments.map(c => <Paper elevation={2} style={{ marginTop: "10px", padding: "20px" }} key={c.id}>{c.comment}</Paper>)}
      </div>
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
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    }))
  })
};

export default Blog;