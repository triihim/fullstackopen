import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const byLikes = (a, b) => a.votes < b.votes ? 1 : -1;
  const containing = (anecdote, str) => anecdote.content.toLowerCase().includes(str.toLowerCase());
  const anecdotes = useSelector(state => [...state.anecdote].sort(byLikes).filter((a) => containing(a, state.filter)));
  const dispatch = useDispatch();

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );

}

export default AnecdoteList;