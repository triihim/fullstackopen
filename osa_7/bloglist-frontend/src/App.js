import React, { useEffect, useRef } from "react";
import blogService from "./services/blogService";
import { Notification } from "./components/notification/notification";
import Togglable from "./components/togglable/togglable";
import BlogForm from "./components/blog/blogForm";
import BlogList from "./components/blog/blogList";
import Blog from "./components/blog/blog";
import LoginForm from "./components/login/loginForm";
import UserList from "./components/user/userList";
import User from "./components/user/user";
import Navbar from "./components/navigation/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, createBlog } from "./reducers/blogsReducer";
import { loginUser, setLoggedInUser, getAllUsers } from "./reducers/usersReducer";
import { Switch, Route, useRouteMatch } from "react-router";
import loginService from "./services/loginService";
import { Container, CssBaseline, Paper } from "@material-ui/core";

const App = () => {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => a.likes < b.likes ? 1 : -1));
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const users = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const userRouteMatch = useRouteMatch("/users/:id");
  const user = userRouteMatch ? users.find(u => u.id === userRouteMatch.params.id) : null;

  const blogRouteMatch = useRouteMatch("/blogs/:id");
  const blog = blogRouteMatch ? blogs.find(b => b.id === blogRouteMatch.params.id) : null;

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllUsers());
    const user = loginService.getLoggedInUser();
    if(user) {
      dispatch(setLoggedInUser(user));
    }
  }, []);

  useEffect(() => {
    blogService.setToken(loggedInUser && loggedInUser.token);
  }, [loggedInUser]);

  const handleBlogCreation = (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  const handleLogin = async (username, password) => {
    dispatch(loginUser(username, password));
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
        <CssBaseline />
        <Navbar />
        <main style={{ marginTop: "20px" }}>
          <Container>
            <Notification />
            <Switch>
              <Route path="/users/:id">
                <User user={user} />
              </Route>
              <Route path="/users">
                <UserList users={users} />
              </Route>
              <Route path="/blogs/:id">
                <Blog blog={blog} />
              </Route>
              <Route path="/">
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                  <BlogForm handleCreation={handleBlogCreation}/>
                </Togglable>
                <Paper elevation={2} style={{ padding: "10px 20px" }}>
                  <BlogList blogs={blogs} />
                </Paper>
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    );
  }

};

export default App;
