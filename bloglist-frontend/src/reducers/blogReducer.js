import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setUser } from "./userReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((b) => (b.id === updated.id ? updated : b));
    },
    eraseBlog(state, action) {
      state.splice(state.findIndex((blog) => blog.id === action.payload));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blog.id);
    dispatch(eraseBlog(removedBlog));
  };
};

export const likeBlog = (blog) => {
  const toLike = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const changedBlog = await blogService.update(toLike.id, toLike);
    dispatch(updateBlog(changedBlog));
    dispatch(initializeBlogs());
  };
};

export const { addBlog, setBlogs, updateBlog, eraseBlog } = blogSlice.actions;
export default blogSlice.reducer;
