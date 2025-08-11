const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const middleware = require("../utils/middleware");



// get all users
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.status(200).json(blogs);
});

// get user by Id
blogsRouter.get("/:id", async (request, response) => {
  console.log("entering get by id in controller")
  const id = request.params.id
  console.log(`calling get user by id in controller with id ${id}`)
  const blog = await Blog.findById(id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).json(`Error: blog not found with this id`)
  }

})

// create blog
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  // console.log("ENTERING BLOGS POST");

  let body = request.body;
  // console.log("body in post", body);
  const user = request.user;
  if (!user) {
    // console.log("user is missing");
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  if (!body.author && !body.title) {
    // console.log("no author and title");
    response.status(400).send("author and title are missing");
    return;
  } else if (!body.author && body.title) {
    // console.log("no author");
    response.status(400).send("author is missing");
    return;
  } else if (body.author && !body.title) {
    // console.log("no title");
    response.status(400).send("no title");
    return;
  }
  if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: []
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  if (savedBlog) {
    response.status(201).json(savedBlog);
  }
});
// Delete all blogs
blogsRouter.delete(
  "/",
  middleware.userExtractor,
  async (request, response) => {
    console.log('entering delete all method')
    await Blog.deleteMany()
    return response
      .status(200)
      .send("all blogs successfully deleted")
  }
)

// Delete blog by id
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    // console.log("params", request.params);
    const user = request.user
    const blogId = request.params.id;
    if (!blogId) {
      // console.log("no id");
      return response.status(400).send("id not found in request");
    }
    // console.log("blogid ok. hitting findById");
    let blogToBeDeleted;
    try {
      blogToBeDeleted = await Blog.findById(blogId);
    } catch (e) {
      // console.log(`Error deleting blog: ${e.message}`);
      return response.status(500).json({ Error: e.message });
    }
    if (!blogToBeDeleted) {
      // console.log("no blog to be deleted");
      return response.status(404).send("no blog found");
    }
    const userId = request.user._id.toString();

    if (userId !== blogToBeDeleted.user.toString()) {
      // console.log(
      //   `user id ${user} is NOT equal to blog user ${blogToBeDeleted.user} `,
      // );
      return response
        .status(400)
        .json({
          Error:
            "`user id ${user} is NOT equal to blog user ${blogToBeDeleted.user} `",
        });
    }
    // get the user associated with the blog
    const blogUser = blogToBeDeleted.user.toString();
    // get the blog array for the user
    const userBlogs = user.blogs
    // create new blog array without the blog that we are deleting 
    const newBlogs = userBlogs.filter(b => b.toString() != blogId)

    try {
      // delete the blog
      await Blog.deleteOne({ _id: blogId });
      // replace the blog array with the one without the deleted blog
      await User.updateOne({ _id: blogUser }, { $set: { blogs: newBlogs } })
      // console.log(`succesfully deleted! ${blogId}`);
      response.status(200).json(blogId);
    } catch (e) {
      response.status(500).json({ error: "error while deleting" });
    }
  },
);

// Helper functions
const getIdAndFetchByIdAndCheck = async (request, response) => {
  const id = request.params.id
  const { content } = request.body
  const blogToBeUpdated = await Blog.findById(id)
  if (!blogToBeUpdated) {
    response.status(404).send('no blog found')
    throw new Error('Error while fetching blog by id. No blog found with that id.')
  }
  return { blogToBeUpdated, content }
}

// update blog
blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  console.log('entering put method')
  /* 
  TODO i need to ensure that the return content includes the id so that we can update the blog in react query 
  */
  const user = request.user
  // console.log('user in put', user)
  const { type } = request.body
  const { blogToBeUpdated, content } = await getIdAndFetchByIdAndCheck(request, response)
  if (!blogToBeUpdated) return null
  const blogToBeUpdatedId = blogToBeUpdated._id.toString()
  let updatedBlog = null
  /**
   * A switch statement that looks at the type and discriminates between the type of content and the type of operation:
   * 1. in the case of LIKE, the content is a new blog object with an increment like,
   * 2. in the case of COMMENT, the content is just the comment and the mongoose comment object needs to be created
   */
  switch (type) {
    case 'LIKE':
      try {
        updatedBlog = await Blog.findByIdAndUpdate(
          blogToBeUpdatedId,
          content,
          { new: true }
        );
      } catch (e) {
        console.log(`error while trying to update: ${e.message}`)
        throw new Error(`Error while updating blog`)
      }
      response.status(200).json(updatedBlog);
      break
    case 'COMMENT':
      const comment = {
        ...content,
        blog: blogToBeUpdatedId,
        user: user._id.toString(),
        likes: 0
      }
      try {
        console.log('blogToBeUpdated', blogToBeUpdated)
        blogToBeUpdated.comments.push(comment)
        await blogToBeUpdated.save()
        const updatedBlogWithComment = await Blog.findById(blogToBeUpdatedId)
        response.status(200).json(updatedBlogWithComment)
      } catch (e) {
        console.log('error cause', e.cause)
        console.log('error message', e.message)
        response.status(500).json({ error: `${e.message}` })
      }

      break
    default:
      response.status(400).json({ Error: `type incorrect for PUT method` })
  }

});

module.exports = blogsRouter;
