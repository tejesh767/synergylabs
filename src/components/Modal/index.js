import {useState, useEffect} from 'react'
import './index.css'

const Modal = ({onClose, onSave, initialData}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {street: '', city: ''},
    company: '',
    website: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = e => {
    const {name, value} = e.target
    if (name.startsWith('address.')) {
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split('.')[1]]: value,
        },
      }))
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const phonePattern = /^[0-9]{10}$/

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.'
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.'
    }
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.'
    }
    if (!formData.address.street) {
      newErrors.street = 'Street address is required.'
    }
    if (!formData.address.city) {
      newErrors.city = 'City is required.'
    }
    if (formData.company && formData.company.length < 3) {
      newErrors.company = 'Company name must be at least 3 characters long.'
    }
    if (formData.website && formData.website.length < 3) {
      newErrors.website = 'Website must be at least 3 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </label>
          <label>
            Address (Street):
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
            {errors.street && <span className="error">{errors.street}</span>}
          </label>
          <label>
            Address (City):
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </label>
          <label>
            Company Name:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </label>
          <label>
            Website:
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            {errors.website && <span className="error">{errors.website}</span>}
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
