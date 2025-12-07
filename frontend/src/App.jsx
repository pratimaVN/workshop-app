import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import AdminDashboard from './pages/AdminDashboard'
import UniversityDashboard from './pages/UniversityDashboard'
import StudentDashboard from './pages/StudentDashboard'

export default function App(){
  const navigate = useNavigate()
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/') }
  return (
    <div>
      <h1>Workshop Management System</h1>
      <nav>
        <Link to="/">Login</Link> | <Link to="/signup">Signup</Link> | <a href="#" onClick={logout}>Logout</a>
      </nav>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/university" element={<UniversityDashboard/>} />
        <Route path="/student" element={<StudentDashboard/>} />
      </Routes>
    </div>
  )
}
