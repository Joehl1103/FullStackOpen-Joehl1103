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

    async function handleLike(blog){
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
          <Togglable buttonLabel='create new blog' cancelLabel='cancel'>
            <BlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              setNotificationType={setNotificationType}
              notificationSettingLogic={notificationSettingLogic}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </Togglable>
        
            <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog}
                deleteAndRefresh={deleteAndRefresh}
                user={user}
                fetchData={fetchData}
                handleLike={handleLike}
                />
            )}
        </div>
    )
}

export default BlogDisplay