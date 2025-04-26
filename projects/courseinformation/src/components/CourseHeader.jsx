const CourseHeader = (props) => {
    console.log('Course header props: ',props)
    return (
      <>
        <h2>{props.name}</h2>
      </>
    )
    
  }

  export default CourseHeader