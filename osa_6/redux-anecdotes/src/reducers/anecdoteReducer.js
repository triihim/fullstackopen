import anecdoteService from "../services/anecdoteService";

export const voteAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id);
    dispatch({
      type: "VOTE",
      id: votedAnecdote.id
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      anecdote: createdAnecdote
    });
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case "VOTE":
      return state.map(a => a.id === action.id ? {...a, votes: a.votes + 1} : a);
    case "NEW_ANECDOTE":
      return state.concat(action.anecdote);
    case "INIT":
      return action.anecdotes;
    default: 
      break;
  }
  return state
}

export default reducer