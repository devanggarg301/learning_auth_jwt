import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess,handleError } from './utils'
const Home = () => {
  const navigate= useNavigate();

  const handleLogout = async () => {
  try {
    const url = 'http://localhost:3000/api/auth/logout'
    const response  = await fetch(url,{
      method:'POST',
      credentials:'include'
    })
    if(response.ok){
      handleSuccess("Logged out successfully")
      console.log("Logout successful")
      setTimeout(()=>{
        navigate('/login')
      },1000)
    }else{
      handleError("Error occurred during logout")
    }
  } catch (error) {
    console.error("Error occurred during logout:", error)
  }
}

const [username, setUsername] = React.useState('')

React.useEffect(() => {
  const getuser = async () => {
    const url = 'http://localhost:3000/api/auth/user'
    try{
      const response = await fetch(url,{
        method:'GET',
        credentials:'include'
      })
      const result = await response.json();
      if (response.ok){
        setUsername(result.user.username)
      }
    }catch(error){
      console.error("Error fetching user:", error)
    }
  }
  getuser()
},[])

const [products,setProducts] = React.useState([]);
const fetchProducts = async()=>{
  try{
    const url = 'http://localhost:3000/api/products'
    const response = await fetch(url,{
      method:'GET',
      credentials:'include'
    })
    const result = await response.json();
    if(response.ok){
      console.log("Products fetched successfully:", result)
      setProducts(result);
    }
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
React.useEffect(()=>{
  fetchProducts();
},[])

return (
  <>
  <h1>Welcome, {username}!</h1>
  <button onClick={handleLogout}>Logout</button>
  <div>
    {
      products.map((item,index)=>{
        return(
        <ul key={index}>
          <span>{item.name} : {item.price}</span>
        </ul>
        )
      })
    }
  </div>
  <ToastContainer />
  </>
)
}

export default Home