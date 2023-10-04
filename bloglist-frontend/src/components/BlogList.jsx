import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const update = (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = (blog) => {
    //deleteBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showRemoveButton = (blog) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    const user = JSON.parse(loggedUserJSON)
    if (!user) {
      return
    }
    if (blog.user.username === user.username) {
      return (
        <div>
          <button onClick={remove(blog)}>Remove</button>
        </div>
      )
    }
  }

  return (
    <div>
      {[...blogs].sort((a,b) => b.likes - a.likes)
      .map(blog => 
        <div style={blogStyle} key={blog.id}>
          {blog.title}
          <br />
          {blog.url}
          <br />
          Likes:&nbsp; {blog.likes} &nbsp;<button onClick={() => update(blog)}>Like</button>
          <br />
          {blog.author}
        </div>
      )}
    </div>
  )
}

/*
{blogs.map(blog => 
      <div style={blogStyle}>
        <div key={blog.id}>
          <div style={hideWhenVisible}>
            {blog.title} <button onClick={toggleVisibility}>View</button>
          </div>
          <div style={showWhenVisible}>
            {blog.title} <button onClick={toggleVisibility}>Hide</button>
            <br />
            {blog.url}
            <br />
            Likes:&nbsp; {blog.likes} &nbsp;<button onClick={update(blog)}>Like</button>
            <br />
            {blog.author}
            {showRemoveButton(blog)}
          </div>
        </div>
      </div>
      )}
*/

export default Blog