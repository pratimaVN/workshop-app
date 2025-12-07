import React, {useState, useEffect} from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('student')
  const [universityName,setUniversityName]=useState('')
  const [universities,setUniversities]=useState([])
  const [selectedUniversity,setSelectedUniversity]=useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    // fetch approved universities for student selection
    const load = async ()=>{
      try{
        const { data } = await API.get('/auth/universities-public') // public endpoint
        setUniversities(data)
      }catch(e){ console.log('no unis', e) }
    }
    if(role==='student') load()
  },[role])

  const submit = async (e) =>{
    e.preventDefault();
    try{
      const body = { name, email, password, role };
      if(role==='university'){ body.universityName = universityName }
      if(role==='student'){ body.universityId = selectedUniversity }
      const { data } = await API.post('/auth/signup', body)
      if(data.message) { alert(data.message); return }
      alert('Signed up. Login now')
      navigate('/')
    }catch(err){ alert(err.response?.data?.message || 'Error') }
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Sign up</h3>
      <div><input value={name} onChange={e=>setName(e.target.value)} placeholder="name" required /></div>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" required /></div>
      <div>
        <label>Role: </label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="university">University</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role==='university' && <div><input value={universityName} onChange={e=>setUniversityName(e.target.value)} placeholder="University Name" /></div>}

      {role==='student' && (
        <div>
          <label>Select University</label>
          <select value={selectedUniversity} onChange={e=>setSelectedUniversity(e.target.value)} required>
            <option value="">Select...</option>
            {universities.map(u=> <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </div>
      )}

      <button>Sign up</button>
    </form>
  )
}
