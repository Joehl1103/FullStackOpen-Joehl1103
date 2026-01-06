import BlogForm from "./BlogForm";
import Togglable from "../Togglable";
import { Link } from 'react-router-dom'
import { useGetBlogsQuery } from "../../hooks/useBlog";
import '../../styles/blog.css'
import '../../styles/general.css'

const BlogDisplay = () => {
  const { data: blogs, isLoading, isSuccess, error } = useGetBlogsQuery()

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (error) {
    return <div>Error loading blogs: ${error.message}</div>
  }

  if (blogs && isSuccess) {
    return (
      <div>
        <Togglable buttonLabel="create new blog" cancelLabel="cancel">
          <BlogForm />
        </Togglable>

        <h2>Blogs</h2>
        <ul>
          {blogs && blogs.map((blog) => {
            return (
              <li key={blog.id} >
                <Link className="link" to={`/${blog.id}`}>{blog.title} by {blog.author} <b>Likes: {blog.likes}</b></Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div> Blogs are null or undefined ....</div>
  }
}


export default BlogDisplay;
