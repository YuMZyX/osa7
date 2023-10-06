import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
  ? window.localStorage.getItem("loggedBloglistUser")
  : null;
const initialState = null;

const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setNotification("Invalid username or password"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(logoutUser());
  };
};

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
