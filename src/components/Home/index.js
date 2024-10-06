import {useState, useEffect} from 'react'
import './index.css'
import BlogItem from '../BlogItem'
import Modal from '../Modal'

const Home = () => {
  const [originalList, setOriginalList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const openModal = (user = null) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setEditingUser(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setOriginalList(data)
        setFilteredList(data)
      })
      .catch(err => console.log('Error occurred: ', err))
  }, [])

  const onSave = async formData => {
    if (editingUser) {
      const updatedUser = {...editingUser, ...formData}

      setFilteredList(users =>
        users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
      )

      setOriginalList(users =>
        users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
      )
    } else {
      await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => {
          if (response.status === 201) {
            return response.json()
          }
          throw new Error('Failed to add user')
        })
        .then(newUser => {
          setOriginalList(users => [...users, newUser])
          setFilteredList(users => [...users, newUser])
        })
        .catch(err => console.log('Error:', err))
    }
    closeModal()
  }

  const onDelete = async id => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to delete user')
        }
        setOriginalList(users => users.filter(user => user.id !== id))
        setFilteredList(users => users.filter(user => user.id !== id))
      })
      .catch(err => console.log('Error:', err))
  }

  const filtering = e => {
    const updatedData = originalList.filter(each =>
      each.username.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setFilteredList(updatedData)
  }

  return (
    <div className="home-container">
      <div className="searchContainer">
        <p>Search : </p>
        <input
          type="search"
          className="search"
          placeholder="Enter a Username"
          onChange={filtering}
        />
      </div>

      <div className="tableHeaders">
        <div className="header-titles">
          <p>Name</p>
          <p>Username</p>
          <p>Email</p>
          <p>Actions</p>
        </div>
        <button
          className="add-button"
          type="button"
          onClick={() => openModal(null)}
        >
          Add
        </button>
      </div>
      <div className="table-body">
        {filteredList.map(user => (
          <BlogItem
            key={user.id}
            item={user}
            onDelete={onDelete}
            onEdit={() => openModal(user)}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} onSave={onSave} initialData={editingUser} />
      )}
    </div>
  )
}

export default Home
