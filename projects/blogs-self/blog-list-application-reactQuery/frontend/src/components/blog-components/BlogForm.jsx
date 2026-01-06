import { useContext } from 'react'
import BlogInfoContext, { useResetBlogInfoState } from "../../contexts/blogInfoContext";
import { useCreateBlog, useNewBlogMutation } from '../../hooks/useBlog';
import { useNotificationWithTimeout } from '../../contexts/notificationContext';
import { Input, Button, Label } from '../../styles/styledComponent.jsx'

const BlogForm = () => {
  const [blogInfo, BlogInfoDispatch] = useContext(BlogInfoContext)
  const { title, author, url } = blogInfo
  const newBlogMutation = useNewBlogMutation()
  const dispatchWithTimeout = useNotificationWithTimeout()
  const resetBlogInfoState = useResetBlogInfoState()
  const createBlog = useCreateBlog()

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(title, author, url, newBlogMutation, resetBlogInfoState, dispatchWithTimeout);
  };

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputDiv">
          <Label>Title:</Label>
          <Input
            data-testid="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => BlogInfoDispatch({ type: 'SET-TITLE', payload: target.value })}
          />
          <br />
          <Label>Author:</Label>
          <Input
            data-testid="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => BlogInfoDispatch({ type: 'SET-AUTHOR', payload: target.value })}
          />
          <br />
          <Label>Url:</Label>
          <Input
            data-testid="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => BlogInfoDispatch({ type: 'SET-URL', payload: target.value })}
          />
        </div>
        <br />
        <Button data-testid="createBlogButton" type="submit">
          create new blog
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
