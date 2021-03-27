import React from 'react'
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App