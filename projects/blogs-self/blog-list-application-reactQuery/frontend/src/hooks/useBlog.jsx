import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogsService'
import { reverseLike } from '../utils/helpers'

export const useGetBlogsQuery = () => {
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const blogs = await blogService.getAll()
      return blogs.sort(reverseLike)
    }
  })

  return { data, isLoading, isSuccess, error }
}

export const useGetOneBlogQuery = (blogId) => {
  const { data: blog, isLoading, isSuccess, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: async () => {
      const blog = await blogService.getById(blogId)
      return blog
    },
    enabled: !!blogId
  })

  return { blog, isLoading, isSuccess, error }
}

export const useNewBlogMutation = () => {
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: (blogInfo) => blogService.createBlog(blogInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  return newBlogMutation
}

export const useChangedBlogMutation = () => {
  const queryClient = useQueryClient()
  const changedBlogMutation = useMutation({
    mutationFn: ({ body, id }) => blogService.updateBlog(body, id),
    onSuccess: async (updatedBlog) => {
      // todo I need to ensure that the return value includes the id
      queryClient.invalidateQueries({ queryKey: ['blog', updatedBlog.id] })
    }
  })
  return changedBlogMutation
}

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
  })

  return deleteBlogMutation
}

export const useHandleLike = () => {
  async function handleLike(blog, changedBlogMutation, dispatchWithTimeout) {
    console.log('handling like')
    const body = {
      type: 'LIKE',
      content: {
        ...blog,
        likes: blog.likes + 1,
      }
    }
    changedBlogMutation.mutate({ body: body, id: blog.id })
    dispatchWithTimeout('success', `${blog.title} upvoted!`)
  }

  return handleLike
}

export const useAddComment = () => {
  async function addComment(blog, comment, changedBlogMutation) {
    console.log('comment in addCOmment', comment)
    const body = {
      type: 'COMMENT',
      content: {
        content: comment,
        date: new Date()
      }
    }
    console.log('body in useAddComment', body)
    changedBlogMutation.mutate({ body: body, id: blog.id })
  }
  return addComment
}

export const useCreateBlog = () => {
  const createBlog = async (title, author, url, newBlogMutation, resetBlogInfoState, dispatchWithTimeout) => {
    const blogInfo = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: null,
    };
    try {
      newBlogMutation.mutate(blogInfo)
      resetBlogInfoState()
      dispatchWithTimeout("success", `${title} by ${author} added!`)
    } catch (error) {
      dispatchWithTimeout('error', error.message)
    }
  }
  return createBlog
}

export const useDeleteBlog = () => {
  const deleteBlog = async (id, title, author, deleteBlogMutation, dispatchWithTimeout) => {
    if (window.confirm(`Are you sure that you want to delete ${title} by ${author}?`,)) {
      deleteBlogMutation.mutate(id)
      dispatchWithTimeout('success', `${title} by ${author} successfully deleted`)
    }
  };
  return deleteBlog
}


