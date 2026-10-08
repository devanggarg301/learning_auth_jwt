import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to ="/login"/>}/>
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}/>
      <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
      <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
    </Routes>
  </BrowserRouter>
)
