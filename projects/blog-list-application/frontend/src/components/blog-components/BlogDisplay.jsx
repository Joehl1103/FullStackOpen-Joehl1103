import Blog from "./Blog"
import { useState,useEffect } from 'react'
import blogService from '../../services/blogs'
import BlogForm from "./BlogForm"
import Togglable from "../Togglable"

const BlogDisplay = ({ notificationSettingLogic,setNotificationType,user }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [uniqueId, setUniqueId] = useState(1)

  async function fetchData(){
    try {
    const response = await blogService.getAll()
    function reverse(a,b){return b.likes - a.likes}
    response.sort(reverse)
    setBlogs(response)
  }catch(e){
    console.log(`Error: ${e.message}`)
  }}

  useEffect(() => {
    fetchData()
  }, [])

    async function handleLike(blog){
      // console.log('handleLike function')
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
      },100)
  
    }

    const createBlog = async (title,author,url) => {
      // console.log('title',title)
      // console.log('author',author)
      // console.log('url',url)
      const blogInfo = {
        title: title,
        author: author,
        url: url,
        likes: 0,
        user: null
      }
      // console.log('blogInfo',blogInfo)
      try {
        const response = await blogService.createBlog(blogInfo)
        // console.log('create blog response',response)
        setBlogs(blogs.concat(response))
        setTitle('')
        setAuthor('')
        setUrl('')          
        notificationSettingLogic('blogSuccess',`${title} by ${author} added!`,5000)
      } catch(error) {
          setNotificationType('blogFailure',error.message)
      }
      
    }

    const deleteAndRefresh=async(id,title,author)=>{
      if (window.confirm(`Are you sure that you want to delete ${title} by ${author}?`)){
        await blogService.deleteBlog(id)
        setTimeout(async () => {
          const newBlogs = await blogService.getAll()
          setBlogs(newBlogs)
          window.location.reload()
        },100)
        notificationSettingLogic('deleted',`${title} by ${author} successfully deleted`,7000)
      }
      
    }

    function incrementUniqueId(){
      const newUniqueId = uniqueId + 1
      setUniqueId(newUniqueId)
    }

    return (
        <div>
          <Togglable buttonLabel='create new blog' cancelLabel='cancel'>
            <BlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              createBlog={createBlog}
            />
          </Togglable>
        
            <h2>Blogs</h2>
            {blogs.map((blog,index) => {
              // {console.log('blog in blogs.map',blog)}
              // {console.log('index',index)}
              return(
              <Blog 
                key={blog.id}
                blog={blog}
                deleteAndRefresh={deleteAndRefresh}
                user={user}
                fetchData={fetchData}
                handleLike={handleLike}
                uniqueId={index}
                />
            )
          })}
        </div>
    )
}

export default BlogDisplay