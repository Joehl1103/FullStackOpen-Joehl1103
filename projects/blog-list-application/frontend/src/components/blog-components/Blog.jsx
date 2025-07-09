import blogService from '../../services/blogs'

const Blog = (props) => {
  // console.log('props',props)
  const {blog,deleteAndRefresh} = props
  
  return (
    <div>
      <div className='blog-div'>
        <h4>{blog.title}</h4>
        Author: {blog.author}<br/>
        Url: <a href={blog.url}>{blog.url}</a><br/>
        Likes: {blog.likes}<br/>
        <button onClick={() => deleteAndRefresh(blog.id,blog.title,blog.author)}>Delete</button><br/>
      </div>
    </div>  
  )
}

export default Blog