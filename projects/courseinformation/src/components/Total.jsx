
const Total = ({course}) => {
  console.log("Total course object: ",course)
    const parts = course.parts
    const total = 
      parts.reduce((t,c)=> t+c.exercises,0)
    
    return (
      <p>Total number of exercises: {total}  </p>
    )
  }

export default Total