import { useLoggedinUserValue } from "../../contexts/loggedinUserContext";
import Togglable from "../Togglable";
import DeleteButton from "./DeleteButton";
import { useParams } from 'react-router-dom'
import { useChangedBlogMutation, useDeleteBlog, useGetOneBlogQuery, useHandleLike } from "../../hooks/useBlog";
import { useNotificationWithTimeout } from "../../contexts/notificationContext";
import BlogCommentForm from "./comments/BlogCommentForm";
import Comment from "./comments/Comment";
import { ContainerDiv, MinorContainerDiv, LikeButton , HR} from "../../styles/styledComponent";
import { Link } from 'react-router-dom'

const Blog = () => {
  const blogId = useParams().id
  const user = useLoggedinUserValue()

  if (!user) {
    return <div>Error... no user in blog</div>
  }

  const { blog, isLoading, isSuccess, error } = useGetOneBlogQuery(blogId)
  let comments = null
  blog ? { comments } = blog : null
  const handleLike = useHandleLike()
  const changedBlogMutation = useChangedBlogMutation()
  const dispatchWithTimeout = useNotificationWithTimeout()
  const deleteBlog = useDeleteBlog()

  if (isLoading) {
    return <div>...loading</div>
  }

  if (error) {
    return <div>Error: ${error.message}</div>
  }

  if (!blog) {
    return <div>No blog to display</div>
  }
  if (isSuccess) {
    return (
      <div>
          <h3 data-testid="blog-title">
            {blog.title} by {blog.author}
          </h3>
          <ContainerDiv>
            <div className="authUrl">
            Author: {blog.author}
            <br />
            Url: <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="likeDiv">
              Likes: {blog.likes}{" "}
              <LikeButton data-testid={"like-button"} onClick={() => handleLike(blog, changedBlogMutation, dispatchWithTimeout)}>
                👍
              </LikeButton>
            </div>
            <div className="blogUser">
              <i>Blog added by <Link style={{color: "gray"}} to={`/users/${user.id}`}>{user.username}</Link></i>
            </div>
        </ContainerDiv>
            {blogId && user.id === blog.user ? (
              <DeleteButton blog={blog} deleteBlog={deleteBlog} />
            ) : null}
        <div className="commentDiv">
          <h4>Comments</h4>
          {comments.length > 0 ?
            <ContainerDiv>
              {comments.map(c => (
                <div key={c._id.toString()}>
                  <Comment comment={c} />
                </div>
              ))}
            </ContainerDiv> : <div></div>}
          <Togglable buttonLabel="add comment" cancelLabel="close comments" >
            <div >
              <BlogCommentForm blog={blog} />
            </div>
          </Togglable>
        </div>
      </div>
    );
  };
}

export default Blog;
