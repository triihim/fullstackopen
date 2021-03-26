import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" type="text" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;