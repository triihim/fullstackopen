/*
  HUOM! Tehtävänannossa käskettiin poistamaan ylimääräiset tiedostot:
  App.css, App.test.js, logo.svg, reportWebVitals.js, setupTests.js,
  mutta reportWebVitalis.js:n poiston jälkeen ohjelma ei enää toimi.
  Tästä syystä edelleen tiedostoissa mukana.
*/

import React from 'react'

const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.parts[0]} />
      <Part content={props.parts[1]} />
      <Part content={props.parts[2]} />
    </div>
  );
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.count}
    </p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App