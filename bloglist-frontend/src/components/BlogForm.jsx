import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const blog = ({
      title: title,
      author: author,
      url: url,
    })
    dispatch(createBlog(blog))
    dispatch(setNotification(`A new blog: ${title} was added`))
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('url').value = ''
  }

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id="title" name="title" />
        </div>
        <div>
          Author:
          <input id="author" name="author" />
        </div>
        <div>
          Url:
          <input id="url" name="url" />
        </div>
        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
