import axios from "axios";

const apiUrl = "http://localhost:3003/api/blogs";

let token_;

const blogService = {

  setToken: token => token_ = `bearer ${token}`,

  getAll: async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  },

  create: async (blog) => {
    const response = await axios.post(apiUrl, blog, { headers: { Authorization: token_ } });
    return response.data;
  },

  like: async (blogId) => {
    const getResponse = await axios.get(`${apiUrl}/${blogId}`);
    const blog = getResponse.data;
    blog.likes++;
    const putResponse = await axios.put(`${apiUrl}/${blogId}`, blog, { headers: { Authorization: token_ } });
    return putResponse.data;
  },

  delete: async (blogId) => {
    await axios.delete(`${apiUrl}/${blogId}`, { headers: { Authorization: token_ } });
  },

  comment: async (blogId, comment) => {
    const response = await axios.post(`${apiUrl}/${blogId}/comments`, { comment }, { headers: { Authorization: token_ } });
    return response.data; // Commented blog.
  }
};

export default blogService;