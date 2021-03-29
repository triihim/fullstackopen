import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Paper, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setErrorNotification } from "../../reducers/notificationReducer";

const BlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if(!title.length || !author.length || !url.length) {
      dispatch(setErrorNotification("Title, author and url are all required"));
    } else {
      setTitle("");
      setAuthor("");
      setUrl("");
      handleCreation({ title, author, url });
    }
  };

  const textFieldStyle = {
    margin: "5px 0",
  };

  return (
    <Paper elevation={2} style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField style={textFieldStyle} name="title" value={title} onChange={e => setTitle(e.target.value)} label="Title" />
        </div>
        <div>
          <TextField style={textFieldStyle} name="author" value={author} onChange={e => setAuthor(e.target.value)} label="Author" />
        </div>
        <div>
          <TextField style={textFieldStyle} name="url" value={url} onChange={e => setUrl(e.target.value)} label="Url" />
        </div>
        <Button style={{ marginTop: "20px" }} variant="contained" color="primary" id="submitBlogButton" type="submit">Create</Button>
      </form>
    </Paper>
  );
};

BlogForm.propTypes = {
  handleCreation: PropTypes.func.isRequired
};

export default BlogForm;