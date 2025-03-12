import { useState } from 'react'

const Button = ({type, handleClick}) => <button onClick={handleClick}>{type}</button>

const StatisticLine = ({text, value}) => {
  if (text == 'positive')
    return <div>{text} {value}%</div> 
  return <div>{text} {value}</div> 
} 

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = all > 0 ? (good-bad)/all : 0
  const positive = all > 0 ? (good/all)*100 : 0

  if (all == 0)
    return <div>No feedback given</div>

  return (
    <>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={all} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={positive} />
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button type={'good'} handleClick={handleGoodClick} />
      <Button type={'neutral'} handleClick={handleNeutralClick} />
      <Button type={'bad'} handleClick={handleBadClick} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App