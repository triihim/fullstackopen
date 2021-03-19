import React, { useState } from "react";

const StatisticLine = (props) => {
  const {text, value} = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const isFeedbackGiven = () => good + neutral + bad > 0;
  if(isFeedbackGiven()) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={good + neutral + bad} />
            <StatisticLine text="Average" value={ (good - bad) / (good + neutral + bad) } />
            <StatisticLine text="Positive" value={ (good / (good + neutral + bad)) * 100 } />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  
}

const Button = (props) => {
  const {text, handleClick} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(neutral + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
