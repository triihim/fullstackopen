import axios from "axios";

const apiUrl = "http://localhost:3003/api/blogs"

let token_

const blogService = {

  setToken: token => token_ = `bearer ${token}`,

  getAll: async () => {
      const response = await axios.get(apiUrl);
      return response.data;
  },

  create: async (blog) => {
    const response = await axios.post(apiUrl, blog, {headers: {Authorization: token_}});
    return response.data;
  }

}

export default blogService;