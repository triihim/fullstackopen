import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setUrl("");
    handleCreation({ title, author, url });
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title <input name="title" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
          Author <input name="author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          Url <input name="url" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <button id="submitBlogButton" type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreation: PropTypes.func.isRequired
};

export default BlogForm;