const DeleteButton = ({ blog, deleteAndRefresh }) => {
   

return(
    <>
        <button
         onClick={
          () => deleteAndRefresh(blog.id,blog.title,blog.author)
          }>
          delete blog
          </button><br/> 
    </>
)
}

export default DeleteButton