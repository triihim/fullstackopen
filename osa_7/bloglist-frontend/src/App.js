import React, { useEffect, useRef } from "react";
import blogService from "./services/blogService";
import { Notification } from "./components/notification/notification";
import Togglable from "./components/togglable/togglable";
import BlogForm from "./components/blog/blogForm";
import BlogList from "./components/blog/blogList";
import LoginForm from "./components/login/loginForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, likeBlog, createBlog, deleteBlog } from "./reducers/blogsReducer";
import { loginUser, logoutUser } from "./reducers/usersReducer";

const App = () => {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => a.likes < b.likes ? 1 : -1));
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    blogService.setToken(loggedInUser && loggedInUser.token);
  }, [loggedInUser]);

  const handleLogin = async (username, password) => {
    dispatch(loginUser(username, password));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBlogCreation = (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  const handleBlogDelete = (blog) => {
    if(window.confirm(`Are you sure you want to delete blog: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const handleBlogLike = async (blogId) => {
    dispatch(likeBlog(blogId));
  };

  if(!loggedInUser) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <Notification />
        <div>
          {loggedInUser.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm handleCreation={handleBlogCreation}/>
        </Togglable>
        <BlogList blogs={blogs} handleDelete={handleBlogDelete} handleLike={handleBlogLike} />
      </div>
    );
  }

};

export default App;
