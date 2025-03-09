const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const Part = (prop) => {
  return (
    <p>
      {prop.content.part} {prop.content.exercises}
    </p>
  )
}
const Content = (props) => {
  return(
    <div>
      <Part content = {props.content.parts[0]} />
      <Part content = {props.content.parts[1]} />
      <Part content = {props.content.parts[2]} />
    </div>
  )
}
const Total = (prop) => {
  let total = 0
  prop.total.parts.forEach((element) =>  total += element.exercises)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {part: 'Fundamentals of React', exercises : 10},
      {part: 'Using props to pass data', exercises: 7}, 
      {part: 'State of a component', exercises: 14}
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content  content={course} />
      <Total total={course} />
    </div>
  )
}

export default App