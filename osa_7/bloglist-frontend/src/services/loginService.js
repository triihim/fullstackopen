import axios from "axios";

const apiUrl = "http://localhost:3003/api/login";

const loginService = {

  login: async (username, password) => {
    const response = await axios.post(apiUrl, { username, password });
    window.localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  logout: () => {
    window.localStorage.removeItem("user");
  },

  getLoggedInUser: () => {
    const stored = window.localStorage.getItem("user");
    if(stored) {
      const user = JSON.parse(stored);
      const valid = user.token && user.username && user.name;
      if(!valid) throw Error("No valid logged in user");
      return user;
    }
    return null;
  }

};

export default loginService;