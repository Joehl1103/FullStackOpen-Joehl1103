// GLOBAL VARIABLES

const course = "Half-Stack Application Development"
const parts = [
  {
    name: "Fundamentals of React",
    exercises: 10,
  },
  {
    name: "Using props to pass data",
    exercises: 7,
  },
  {
    name: "State of a component",
    exercises: 14,
  }
]

// COMPONENTS

const CourseHeader = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
  
}

const Part1 = (props) => {
  console.log(props)
  return (
    <>
      <h2>{props.part1}</h2>
      <p>Number of Exercises: {props.exercises1}</p>
    </>

  )
}

const Part2 = (props) => {
  console.log(props)
  return (
    <>
      <h2>{props.part2}</h2>
      <p>Number of Exercises: {props.exercises2}</p>
    </>

  )
}

const Part3 = (props) => {
  console.log(props)
  return (
    <>
      <h2>{props.part3}</h2>
      <p>Number of Exercises: {props.exercises3}</p>
    </>

  )
}


const Content = () => {
  
  return (
    <>
      <Part1 part1={parts[0].name} exercises1={parts[0].exercises}/>
      <Part2 part2={parts[1].name} exercises2={parts[1].exercises}/>
      <Part3 part3={parts[2].name} exercises3={parts[2].exercises}/>
    </>

  )
}

const Total = () => {
  return (
    <p>Total number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises} </p>
  )
}

const App = ()=>{
  
  return (
    <>
      <CourseHeader courseName={course}/>
      <Content parts={parts}/>
      <hr/>
      <Total total={parts}/>
    </>
  )
}

export default App