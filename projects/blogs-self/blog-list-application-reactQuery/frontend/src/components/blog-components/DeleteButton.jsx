import { useDeleteBlog, useDeleteBlogMutation } from "../../hooks/useBlog";
import { useNotificationWithTimeout } from "../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "../../styles/styledComponent";
import '../../styles/general.css'

const DeleteButton = ({ blog }) => {
  const navigate = useNavigate()
  const deleteBlogMutation = useDeleteBlogMutation()
  const deleteBlog = useDeleteBlog()
  const dispatchWithTimeout = useNotificationWithTimeout()
  const { id, title, author, ...rest } = blog
  const handleDeleteBlog = () => {
    deleteBlog(id, title, author,deleteBlogMutation,dispatchWithTimeout)
    navigate("/")
  }
  if (!blog){
    return <div>Blog does not exists. <Link to={"/"}>Return home</Link></div>
  }
  return (
    <div className='deleteButtonDiv'>
      <SmallButton
        onClick={() => handleDeleteBlog()}
      >
        delete
      </SmallButton>
      <br />
    </div>
  );
};

export default DeleteButton;
