import {useState, useEffect} from "react";
import loginService from "./services/loginService";
import blogService from "./services/blogService";
import {Notification, NotificationType} from "./components/notification";

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    handleLogin(username, password);
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const BlogList = ({blogs}) => {
  return blogs.map(b => {
    return (
      <div key={b.id}>
        <p>{b.title}, by {b.author}</p>
      </div>
    );
  });
}

const BlogForm = ({handleCreation}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    handleCreation({title, author, url});
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title <input value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
          Author <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          Url <input value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({isShown: false});

  useEffect(() => {
    (async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(b => b.concat(response));
      } catch(e) {
        showNotification(NotificationType.ERROR, "Could not fetch the blogs :(");
      }
    })();
  }, [])

  const showNotification = (type, message) => {
    setNotification({type, message, isShown: true});
    setTimeout(() => setNotification({...notification, isShown: false}), 3000);
  }

  const handleLogin = async (username, password) => {
    try {
      await loginService.login(username, password);
      setUser(loginService.getLoggedInUser());
      blogService.setToken(loginService.getLoggedInUser().token);
    } catch(e) {
      showNotification(NotificationType.ERROR, "Invalid login credentials");
    }
  }

  const handleLogout = () => {
    loginService.logout();
  }

  const handleBlogCreation = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog);
      setBlogs(blogs.concat(createdBlog));
      showNotification(NotificationType.SUCCESS, `New blog ${blog.title} added`);
    } catch(e) {
      showNotification(NotificationType.ERROR, "Blog creation failed");
    }
  }

  if(!user) {
    return (
      <div>
        {notification.isShown ? <Notification content={notification}/> : null}
        <LoginForm handleLogin={handleLogin} />
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
        <BlogForm handleCreation={handleBlogCreation}/>
        <BlogList blogs={blogs} />
      </div>
    );
  }
  
}

export default App;
