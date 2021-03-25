import React, { useState, useEffect, useRef } from "react";
import loginService from "./services/loginService";
import blogService from "./services/blogService";
import { Notification, NotificationType } from "./components/notification/notification";
import Togglable from "./components/togglable/togglable";
import BlogForm from "./components/blog/blogForm";
import BlogList from "./components/blog/blogList";
import LoginForm from "./components/login/loginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ isShown: false });

  const loginFormRef = useRef();
  const blogFormRef = useRef();

  const setBlogsSortedByLikes = blogsToSet => {
    setBlogs([...blogsToSet].sort((a, b) => a.likes < b.likes ? 1 : -1));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(b => b.concat(response));
      } catch(e) {
        showNotification(NotificationType.ERROR, "Could not fetch the blogs :(");
      }
    })();
  }, []);

  useEffect(() => {
    const loggedInUser = loginService.getLoggedInUser();
    if(loggedInUser) {
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message, isShown: true });
    setTimeout(() => setNotification({ ...notification, isShown: false }), 3000);
  };

  const handleLogin = async (username, password) => {
    loginFormRef.current.toggleVisibility();
    try {
      await loginService.login(username, password);
      setUser(loginService.getLoggedInUser());
      blogService.setToken(loginService.getLoggedInUser().token);
    } catch(e) {
      console.log(e);
      showNotification(NotificationType.ERROR, "Invalid login credentials");
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleBlogCreation = async (blog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(blog);
      setBlogs(blogs.concat(createdBlog));
      showNotification(NotificationType.SUCCESS, `New blog ${blog.title} added`);
    } catch(e) {
      showNotification(NotificationType.ERROR, "Blog creation failed");
    }
  };

  const handleBlogDelete = async (blog) => {
    try {
      if(window.confirm(`Are you sure you want to delete blog: ${blog.title}?`)) {
        await blogService.delete(blog.id);
        setBlogsSortedByLikes(blogs.filter(b => b.id !== blog.id));
        showNotification(NotificationType.SUCCESS, `Blog ${blog.title} deleted`);
      }
    } catch(e) {
      showNotification(NotificationType.ERROR, "Could not delete blog");
    }
  };

  const handleBlogLike = async (blogId) => {
    try {
      const likedBlog = await blogService.like(blogId);
      setBlogsSortedByLikes(blogs.filter(b => b.id !== blogId).concat(likedBlog));
    } catch(e) {
      showNotification(NotificationType.ERROR, "Could not update blog likes");
    }
  };

  if(!user) {
    return (
      <div>
        {notification.isShown ? <Notification content={notification}/> : null}
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {notification.isShown ? <Notification content={notification}/> : null}
          {user.name} logged in
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
