import { useState } from "react"
import '../../../styles/blog.css'
import { useAddComment, useChangedBlogMutation } from "../../../hooks/useBlog"
import { useNotificationWithTimeout } from "../../../contexts/notificationContext"
import { TextArea, SmallButton, MinorContainerDiv } from "../../../styles/styledComponent"

const BlogCommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const addComment = useAddComment()
  const changedBlogMutation = useChangedBlogMutation()
  const dispatchWithTimeout = useNotificationWithTimeout()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('comment in blogCommentForm', comment)
    addComment(blog, comment, changedBlogMutation)
    dispatchWithTimeout('success', 'comment added')
    setComment('')
  }

  return (
    <MinorContainerDiv>
      <form onSubmit={handleSubmit}>
        <label>Comment: </label><br />
        <TextArea placeholder="Add your comment here..." value={comment} onChange={({ target }) => { setComment(target.value) }} /><br />
        <SmallButton type="submit">add</SmallButton>
      </form>
    </MinorContainerDiv>
  )
}

export default BlogCommentForm
