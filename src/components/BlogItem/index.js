import './index.css'
import {useHistory} from 'react-router-dom'

const BlogItem = props => {
  const {item, onDelete, onEdit} = props
  const {id, email, name, username} = item
  const history = useHistory()

  const goToUserDetails = () => {
    history.push(`/user/${id}`)
  }

  return (
    <div className="table-row" role="row">
      <div
        className="table-cell"
        onClick={goToUserDetails}
        onKeyDown={e =>
          (e.key === 'Enter' || e.key === ' ') && goToUserDetails()
        }
        role="button"
        tabIndex={0}
        style={{cursor: 'pointer'}}
      >
        {name}
      </div>
      <div
        className="table-cell"
        onClick={goToUserDetails}
        onKeyDown={e =>
          (e.key === 'Enter' || e.key === ' ') && goToUserDetails()
        }
        role="button"
        tabIndex={0}
        style={{cursor: 'pointer'}}
      >
        {username}
      </div>
      <div
        className="table-cell"
        onClick={goToUserDetails}
        onKeyDown={e =>
          (e.key === 'Enter' || e.key === ' ') && goToUserDetails()
        }
        role="button"
        tabIndex={0}
        style={{cursor: 'pointer'}}
      >
        {email}
      </div>

      <div className="button-container">
        <button
          className="action-button"
          type="button"
          onClick={e => {
            e.stopPropagation()
            onEdit(id)
          }}
        >
          EDIT
        </button>
        <button
          className="action-button"
          type="button"
          onClick={e => {
            e.stopPropagation()
            onDelete(id)
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default BlogItem
