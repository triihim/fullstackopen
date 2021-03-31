import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState('authors')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem("library-app-token");
    if(token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onLogin = () => {
    setPage("authors");
    setIsLoggedIn(true);
  }

  const logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
    client.clearStore();
  }

  const hideButtonWhenLoggedIn = { display: isLoggedIn ? "none" : "inline" }
  const showButtonWhenLoggedIn = { display: isLoggedIn ? "inline" : "none" }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} style={showButtonWhenLoggedIn}>add book</button>
        <button onClick={() => setPage("recommendations")} style={showButtonWhenLoggedIn}>recommendations</button>
        <button onClick={() => setPage("login")} style={hideButtonWhenLoggedIn}>login</button>
        <button onClick={logout} style={showButtonWhenLoggedIn}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        userCanEdit={isLoggedIn}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations 
        show={page === "recommendations"}
      />

      <Login 
        show={page === "login"}
        handleSuccessfulLogin={onLogin}
      />

    </div>
  )
}

export default App