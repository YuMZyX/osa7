import { useParams } from "react-router-dom"
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from "react-redux"

const Blog = ({blogs}) => {

    const dispatch = useDispatch()
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    const update = (blog) => {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`You liked: ${blog.title}`))
    }

    if (!blog) {return null}

    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes <button onClick={() => update(blog)}>Like</button><br />
        Added by {blog.user.name}
      </div>
    )
}

export default Blog