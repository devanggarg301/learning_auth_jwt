import React from 'react'
import {Navigate} from 'react-router-dom'

const protectedRoute = ({children}) => {

const [loading,setLoading] = React.useState(true);
const [authenticated,setAuthenticated] = React.useState(false);

const checkAuth = async()=>{
    try{
        const url = 'http://localhost:3000/api/auth/user'
        const response = await fetch(url,{
            method:'GET',
            credentials:'include'
        })
        if(response.ok){
            setAuthenticated(true);
        }else{
            setAuthenticated(false);
        }
    }catch(error){
        console.error("Error occurred during authentication check:", error)
        setAuthenticated(false);
    }
    
    setLoading(false);
}

React.useEffect(()=>{
    checkAuth();
},[]);

if(loading){
    return <div>Loading...</div>
}

if(!authenticated){
    return <Navigate to="/login" />
}

  return children;
}

export default protectedRoute