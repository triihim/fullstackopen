import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import anecdoreReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
  anecdote: anecdoreReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)