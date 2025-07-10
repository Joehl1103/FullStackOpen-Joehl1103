import Togglable from "../Togglable"

const Blog = (props) => {
  // console.log('props',props)
  const {blog,deleteAndRefresh} = props
  
  return (
    <div>
      <div className='blog-div'>
          <h4>{blog.title}</h4>
          <Togglable buttonLabel='view details' cancelLabel='hide details'>
            Author: {blog.author}<br/>
            Url: <a href={blog.url}>{blog.url}</a><br/>
            Likes: {blog.likes}<br/>
            <button onClick={() => deleteAndRefresh(blog.id,blog.title,blog.author)}>delete blog</button><br/>
          </Togglable>
     </div>
    </div>  
  )
}

export default Blog