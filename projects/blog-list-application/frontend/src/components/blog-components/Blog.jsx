import Togglable from "../Togglable"
import blogService from "../../services/blogs"

const Blog = ({ blog,deleteAndRefresh,user,fetchData }) => {
  
  async function handleLike(){
    console.log('handleLike function')
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: user.id
    }
    await blogService.updateBlog(newBlogObject,blog.id)
    setTimeout(() =>{
      fetchData()
    },75)

  }
  
  return (
    <div>
      <div className='blogDiv'>
          <h4>{blog.title} by {blog.author}</h4>
          <Togglable buttonLabel='view details' cancelLabel='hide details'>
            Author: {blog.author}<br/>
            Url: <a href={blog.url}>{blog.url}</a><br/>
            Likes: {blog.likes}{' '}<button onClick={handleLike}>like</button><br/>
            Blog added by {user.username}<br/>
            <button onClick={() => deleteAndRefresh(blog.id,blog.title,blog.author)}>delete blog</button><br/>
          </Togglable>
     </div>
    </div>  
  )
}

export default Blog