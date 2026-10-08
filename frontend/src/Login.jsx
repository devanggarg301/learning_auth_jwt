import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from './utils'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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
      const url = 'http://localhost:3000/api/auth/login'

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      console.log("Status:", response.status)
      console.log("Response:", result)

      if (response.ok) {
        handleSuccess(result.message)

        setTimeout(() => {
          navigate('/home')
        }, 2000)

      } else {
        handleError(result.message || result.error)
      }

    } catch (err) {
      console.error("Fetch error:", err)
      handleError("Unable to connect to server")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>Welcome Back</h1>
        <p>Login to your account</p>

        <form onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

      <ToastContainer />

    </div>
  )
}

export default Login