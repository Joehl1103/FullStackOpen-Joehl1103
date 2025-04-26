import CourseHeader from './CourseHeader'
import Part from './Part'
import Total from './Total'
import courses from '../variables/courses'

const Content = () => {
    console.log("Content course object: ",courses)
    // courses.map(course => {
    //     console.log(course.id)
    //     console.log(course.name)
    //     course.parts.map(part => {
    //       console.log(part.name)
    //       console.log(part.exercises)

    //     })
    // })
  
    return (
     <div>
        {courses.map(course => (
          <div key={course.id}>
              <CourseHeader name={course.name}/> 
              {course.parts.map(part =><Part key={part.id} part={part}/>)}
              <Total course={course}/>
          </div>
        ))}
      </div>
    )
  }

  export default Content