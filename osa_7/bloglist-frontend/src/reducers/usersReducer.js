import loginService from "../services/loginService";
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
      setErrorNotification("Login failed. Ensure the credentials are correct");
    }
  };
};

export const logoutUser = () => {
  loginService.logout();
  return {
    type: "USER_LOGOUT"
  };
};

const initialState = {
  loggedInUser: null
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case "USER_LOGIN": return { ...state, loggedInUser: action.user };
    case "USER_LOGOUT": return { ...state, loggedInUser: null };
    default: return state;
  }
};

export default usersReducer;