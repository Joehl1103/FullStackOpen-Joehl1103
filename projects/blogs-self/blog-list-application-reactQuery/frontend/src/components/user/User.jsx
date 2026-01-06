const User = ({ user }) => {
  if (!user) {
    return <div>no user</div>
  }
  console.log('user in UserView', user)
  const blogs = user.blogs
  console.log('blogs in UserView', blogs)
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <div>
        <ul>
          {blogs && blogs.length > 0 ?
            blogs.map(blog => {
              console.log('blog in blogs.map'.blog)
              return (
                <li key={blog.id}>{blog.title}</li>
              )
            })
            :
            (
              <div>no blogs...</div>
            )
          }
        </ul>
      </div>
    </>
  )
}

export default User
