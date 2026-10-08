import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from './utils'


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const url = 'http://localhost:3000/api/auth/register'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const result = await response.json()

    console.log("Status:", response.status)
    console.log("Response:", result)

    if (response.ok) {
      handleSuccess(result.message)
      setTimeout(()=>{
        navigate('/login')
      },2000)
    } else {
      handleError(result.error)
    }

  } catch (err) {
    console.error("Fetch error:", err)
    handleError("Unable to connect to server")
  }
}

  return (
    <div className="signup-container">
      <div className="signup-box">

        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup