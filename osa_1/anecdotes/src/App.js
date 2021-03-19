import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
  
  const getRandomAnecdoteIndex = () => Math.floor(Math.random() * anecdotes.length);
  
  const [selected, setSelected] = useState(getRandomAnecdoteIndex())
  const [points, setPoints] = useState(anecdotes.map(_ => 0));

  const voteSelected = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };
  
  const getMostVotedCount = () => Math.max(...points);
  const getMostVotedIndex = () => points.indexOf(getMostVotedCount());

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>Votes: {points[selected]}</p>
      <button onClick={() => setSelected(getRandomAnecdoteIndex())}>Next anecdote</button>
      <button onClick={() => voteSelected()}>Vote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[getMostVotedIndex()]}
      <p>Votes: {getMostVotedCount()}</p>
    </div>
  )
}

export default App