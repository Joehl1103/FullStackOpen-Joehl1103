import blogService from '../../services/blogs'
const BlogForm = ({
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    createBlog
    }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog(
            title,
            author,
            url
        )
    }
    
    return (
        <>
            <h2>Add new blog</h2>
                <form onSubmit={handleSubmit}>
                title: {' '}
                <input data-testid='title' type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
                author: {' '}
                <input data-testid='author' type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
                url: {' '}
                <input data-testid='url' type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}/><br/>

                <button data-testid="createBlogButton" type="submit">create new blog</button>

            </form>
        </>
    )
}

export default BlogForm