// GLOBAL VARIABLES

const course = {
  name: "Half-Stack Application Development",
  parts: [
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
  ],
}

// COMPONENTS

const CourseHeader = () => {
  return (
    <>
      <h1>{course.name}</h1>
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
      <Part1 part1={course.parts[0].name} exercises1={course.parts[0].exercises}/>
      <Part2 part2={course.parts[1].name} exercises2={course.parts[1].exercises}/>
      <Part3 part3={course.parts[2].name} exercises3={course.parts[2].exercises}/>
    </>

  )
}

const Total = () => {
  return (
    <p>Total number of exercises: {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} </p>
  )
}

const App = ()=>{
  
  return (
    <>
      <CourseHeader/>
      <Content parts={course}/>
      <hr/>
      <Total total={course}/>
    </>
  )
}

export default App