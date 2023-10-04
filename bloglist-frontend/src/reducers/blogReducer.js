import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map(b => b.id === updated.id ? updated : b)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    
  }
}

export const likeBlog = (blog) => {
  const toLike = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const changedBlog = await blogService.update(toLike.id, toLike)
    dispatch(updateBlog(changedBlog))
  }
}

export const { appendBlog, setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer