const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => <div>{props.parts.map(part => <Part key={part.id} part={part} />)}</div>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({ course }) => {

    const total = course.parts.reduce( (a, c) => a + c.exercises, 0)

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </div>
    )
}

export default Course