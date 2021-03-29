import loginService from "../services/loginService";
import userService from "../services/userService";
import { setErrorNotification } from "./notificationReducer";

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login(username, password);
      dispatch({
        type: "USER_LOGIN",
        user
      });
    } catch (e) {
      dispatch(setErrorNotification("Login failed. Ensure the credentials are correct"));
    }
  };
};

export const logoutUser = () => {
  loginService.logout();
  return {
    type: "USER_LOGOUT"
  };
};

export const setLoggedInUser = user => {
  return {
    type: "USER_SET_LOGGED_IN",
    user
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll();
      dispatch({
        type: "USERS_GET_ALL",
        users
      });
    } catch (e) {
      dispatch(setErrorNotification("Could not fetch the users"));
    }
  };
};

const initialState = {
  loggedInUser: null,
  users: []
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case "USER_LOGIN": return { ...state, loggedInUser: action.user };
    case "USER_LOGOUT": return { ...state, loggedInUser: null };
    case "USER_SET_LOGGED_IN": return { ...state, loggedInUser: action.user };
    case "USERS_GET_ALL": return { ...state, users: state.users.concat(action.users) };
    default: return state;
  }
};

export default usersReducer;