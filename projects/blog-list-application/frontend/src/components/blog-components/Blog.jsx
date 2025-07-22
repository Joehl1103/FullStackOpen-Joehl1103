import Togglable from "../Togglable"
import blogService from "../../services/blogs"
import DeleteButton from "./DeleteButton"


const Blog = ({ blog,deleteAndRefresh,user,fetchData,handleLike }) => {
  console.log('user',user)
  console.log('blog user',blog.user)
  
  return (
    <div>
      <div className='blogDiv'>
          <h4>{blog.title} by {blog.author}</h4>
          <Togglable buttonLabel='view details' cancelLabel='hide details'>
            Author: {blog.author}<br/>
            Url: <a href={blog.url}>{blog.url}</a><br/>
            Likes: {blog.likes}{' '}<button onClick={() => handleLike(blog)}>like</button><br/>
            Blog added by {user.username}<br/>
            {user.username === blog.user.username ? 
              <DeleteButton 
                blog={blog}
                deleteAndRefresh={deleteAndRefresh}/> 
                :
                null}
          </Togglable>
     </div>
    </div>  
  )
}

export default Blog