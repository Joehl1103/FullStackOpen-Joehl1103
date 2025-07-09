import Blog from "./Blog"
import { useState,useEffect } from 'react'
import blogService from '../../services/blogs'
import BlogForm from "./BlogForm"
import Togglable from "../Togglable"

const BlogDisplay = ({ notificationSettingLogic,setNotificationType }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
   })
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

    return (
        <div>
          <Togglable buttonLabel='create new blog'>
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
                deleteAndRefresh={deleteAndRefresh} />
            )}
        </div>
    )
}

export default BlogDisplay