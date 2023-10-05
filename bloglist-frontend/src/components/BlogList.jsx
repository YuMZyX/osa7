import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Link
} from "react-router-dom"

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const toggleVisibility = (id, type) => {
    if (type === 'view') {
      document.getElementById(id + '1').style.display = 'none'
      document.getElementById(id + '2').style.display = ''
    } else if (type === 'hide') {
      document.getElementById(id + '1').style.display = ''
      document.getElementById(id + '2').style.display = 'none'
    }
  }

  const update = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked: ${blog.title}`))
  }

  const remove = (blog) => {
    if (window.confirm(`Remove ${blog.title}`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`You deleted: ${blog.title}`))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const style = {
    display: 'none'
  }

  return (
    <div>
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog => 
        <div style={blogStyle} key={blog.id}>
          <div id={blog.id.concat('1')}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <button onClick={() => toggleVisibility(blog.id, 'view')}>
              View
            </button>
          </div>
          <div style={style} id={blog.id.concat('2')}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <button onClick={() => toggleVisibility(blog.id, 'hide')}>
              Hide
            </button>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>Likes: {blog.likes} <button onClick={() => update(blog)}>Like</button></div>
            <div>{blog.user.name}</div>
            {blog.user.username === user.username&& <button onClick={() => remove(blog)}>Remove</button>}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList



/*
<div>
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog => 
        <div style={blogStyle} key={blog.id}>
          <div id={blog.id.concat('1')}>
            {blog.title}
            <button onClick={() => toggleVisibility(blog.id, 'view')}>
              View
            </button>
          </div>
          <div style={style} id={blog.id.concat('2')}>
            {blog.title}
            <button onClick={() => toggleVisibility(blog.id, 'hide')}>
              Hide
            </button>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>Likes: {blog.likes} <button onClick={() => update(blog)}>Like</button></div>
            <div>{blog.author}</div>
            {blog.user.username === user.username&& <button onClick={() => remove(blog)}>Remove</button>}
          </div>
        </div>
      )}
    </div>
*/