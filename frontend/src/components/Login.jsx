import React, {useState} from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handle = async (e) => {
    e.preventDefault()
    try{
      const { data } = await API.post('/auth/login', { email, password })
      if(!data.token) return alert(data.message || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      const role = data.user.role
      if(role === 'admin') navigate('/admin')
      else if(role === 'university') navigate('/university')
      else navigate('/student')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }
  return (
    <form onSubmit={handle} className="card">
      <h3>Login</h3>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" /></div>
      <button>Login</button>
    </form>
  )
}
