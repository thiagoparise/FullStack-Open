const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return(
    <div>
      <p>
        {props.content[0].part} {props.content[0].exercises}
      </p>
      <p>
        {props.content[1].part} {props.content[1].exercises}
      </p>
      <p>
        {props.content[2].part} {props.content[2].exercises}
      </p>
    </div>
  )
}
const Total = (prop) => {
  let total = 0
  prop.total.forEach((element) =>  total += element.exercises)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {part: 'Fundamentals of React', exercises : 10},
    {part: 'Using props to pass data', exercises: 7}, 
    {part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content  content={content} />
      <Total total={content} />
    </div>
  )
}

export default App