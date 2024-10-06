import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './index.css'

const UserDetails = () => {
  const {id} = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log('Error fetching user data:', err))
  }, [id])

  if (!user) return <p>Loading...</p>
  const {name, username, email, address, phone, website, company} = user

  return (
    <div className="user-details">
      <h2 className="user-title">{name}</h2>
      <p className="user-info">Username: {username}</p>
      <p className="user-info">Email: {email}</p>
      <p className="user-info">Phone: {phone}</p>
      <p className="user-info">Website: {website}</p>
      <div className="address">
        <h3>Address</h3>
        <p>
          {address.street}, {address.suite}
        </p>
        <p>
          {address.city}, {address.zipcode}
        </p>
      </div>
      <div className="company">
        <h3>Company</h3>
        <p>{company.name}</p>
        <p>{company.catchPhrase}</p>
      </div>
    </div>
  )
}

export default UserDetails
