import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [error, setError] = useState("");
  const [ loginUser, result ] = useMutation(LOGIN, {
    onError: (e) => {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 5000);
    }
  });

  useEffect(() => {
    if(result.data) {
      setError("");
      const token = result.data.login.token;
      window.localStorage.setItem("library-app-token", token);
      props.handleSuccessfulLogin();
    }
  }, [result.data])

  if(!props.show) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if(username.length && password.length) {
      loginUser({ variables: { username, password }});
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 5000);
    }
  }

  return(
    <>
      <form onSubmit={handleLoginSubmit}>
        <div>
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
        <p style={{color: "red"}}>{error}</p>
      </form>
    </>
  );

};

export default Login;