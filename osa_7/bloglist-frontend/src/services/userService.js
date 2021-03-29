import axios from "axios";

const apiUrl = "http://localhost:3003/api/users";

const userService = {

  getAll: async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }

};

export default userService;