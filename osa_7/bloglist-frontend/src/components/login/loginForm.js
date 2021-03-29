import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    handleLogin(username, password);
  };

  return (
    <Card style={{ maxWidth: "400px", margin: "30px auto" }}>
      <CardContent>
        <Typography variant="h4">Login to Bloglist</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField style={{ width: "100%" }} label="Username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <TextField style={{ width: "100%" }} label="Password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button style={{ marginTop: "20px" }} variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  );


};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;