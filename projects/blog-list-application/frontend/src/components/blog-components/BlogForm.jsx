import blogService from '../../services/blogs'
const BlogForm = ({
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    setNotificationType,
    notificationSettingLogic,
    blogs,
    setBlogs
    }) => {

    const createBlog = async (event) => {
        event.preventDefault()
        const blogInfo = {
          title: title,
          author: author,
          url: url,
          likes: 0,
          user: null
        }
        console.log('blogInfo',blogInfo)
        try {
          const response = await blogService.createBlog(blogInfo)
          setBlogs(blogs.concat(response))
          setTitle('')
          setAuthor('')
          setUrl('')          
          notificationSettingLogic('blogSuccess',`${title} by ${author} added!`,5000)
        } catch(error) {
            setNotificationType('blogFailure',error.message)
        }
        
      }
    return (
        <>
            <h2>Add new blog</h2>
                <form onSubmit={createBlog}>
                title: {' '}
                <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
                author: {' '}
                <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
                url: {' '}
                <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}/><br/>

                <button type="submit">create new blog</button>

            </form>
        </>
    )
}

export default BlogForm