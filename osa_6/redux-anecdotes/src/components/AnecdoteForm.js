import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = { content: e.target.anecdote.value, votes: 0 };
    if(!anecdote || anecdote.length < 1) {
      alert("Anecdote can't be empty")
    } else {
      props.createAnecdote(anecdote);
      props.setNotification(`Created anecdote: '${anecdote.content}'`, 10);
    }
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

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);