
const Part = ({part}) => {
    console.log("Parts props: ",part)
    return (
      <>
        <div>
          <h3 >{part.name}</h3>
          <p>Number of Exercises: {part.exercises}</p>
       </div>
      </>
  
    )
  }
  
  export default Part
