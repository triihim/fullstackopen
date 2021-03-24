import axios from "axios";

const apiUrl = "http://localhost:3003/api/login"

const loginService = {

  login: async (username, password) => {
      const response = await axios.post(apiUrl, {username, password});
      window.localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
  },

  logout: () => {
    window.localStorage.removeItem("user");
  },

  getLoggedInUser: () => {
    return JSON.parse(window.localStorage.getItem("user"));
  }

}

export default loginService;