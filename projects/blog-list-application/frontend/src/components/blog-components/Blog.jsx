import Togglable from "../Togglable"
import blogService from "../../services/blogs"
import DeleteButton from "./DeleteButton"


const Blog = ({ blog,deleteAndRefresh,user,fetchData,handleLike,uniqueId }) => {
  // console.log('unique id',uniqueId)
  console.log('user id',user.id)
  console.log('blog user id', blog)
  
  return (
    <div>
      <div className='blogDiv'>
          <h4 data-testid="blog-title">{blog.title} by {blog.author}</h4>
          <Togglable data-testid={'view-details'} buttonLabel='view details' cancelLabel='hide details'>
            Author: {blog.author}<br/>
            Url: <a href={blog.url}>{blog.url}</a><br/>
            Likes: {blog.likes}{' '}<button data-testid={'like-button'} onClick={() => handleLike(blog)}>like</button><br/>
            Blog added by {user.username}<br/>
            {user.id === blog.user ? 
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