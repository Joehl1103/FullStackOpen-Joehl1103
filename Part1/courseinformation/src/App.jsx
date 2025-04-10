const CourseHeader = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
  
}

const Part1 = (props) => {
  
  return (
    <>
      <h2>{props.part1}</h2>
      <p>Number of Exercises: {props.exercises1}</p>
    </>

  )
}

const Part2 = (props) => {
  return (
    <>
      <h2>{props.part2}</h2>
      <p>Number of Exercises: {props.exercises2}</p>
    </>

  )
}

const Part3 = (props) => {
  return (
    <>
      <h2>{props.part3}</h2>
      <p>Number of Exercises: {props.exercises3}</p>
    </>

  )
}



const Content = () => {
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14
  
  return (
    <>
      <Part1 part1={part1} exercises1={exercises1}/>
      <Part2 part2={part2} exercises2={exercises2}/>
      <Part3 part3={part3} exercises3={exercises3}/>
    </>

  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises: {props.total} </p>
  )
}

const App = ()=>{
  const course = "Half-Stack Application Development"
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3

  return (
    <>
      <CourseHeader courseName={course}/>
      <Content/>
      <hr/>
      <Total total={total}/>
    </>
  )
}

export default App