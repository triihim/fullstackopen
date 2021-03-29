import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { logoutUser } from "../../reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";

const Navbar = () => {
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="relative">
      <Toolbar variant="regular">
        <Grid container justify="space-between">
          <Grid item>
            <Button style={{ color: "white" }} component={RouterLink} to="/">
              Blogs
            </Button>
            <Button style={{ color: "white" }} component={RouterLink} to="/users">
              Users
            </Button>
          </Grid>
          <Grid item>
            {loggedInUser.name}
            <Button style={{ marginLeft: "10px" }} variant="contained" onClick={handleLogout}>Logout</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;