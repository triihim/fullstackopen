import axios from "axios";

const apiUrl = "http://localhost:3001/anecdotes"

const anecdoteService = {

  getAll: async () => {
    return (await axios.get(apiUrl)).data;
  },

  create: async (anecdote) => {
    return (await axios.post(apiUrl, anecdote)).data;
  },

  vote: async (id) => {
    const anecdote = (await axios.get(`${apiUrl}/${id}`)).data;
    anecdote.votes++;
    return (await axios.put(`${apiUrl}/${id}`, anecdote)).data;
  }

}

export default anecdoteService;