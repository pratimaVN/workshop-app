import React, {useEffect, useState} from 'react'
import API from '../api'

export default function UniversityDashboard(){
  const [title,setTitle]=useState('')
  const [workshops,setWorkshops]=useState([])
  const [students,setStudents]=useState([])

  const load = async ()=>{
    try{
      const { data } = await API.get('/university/workshops'); setWorkshops(data)
    }catch(e){ console.log(e) }
    try{
      const { data } = await API.get('/university/students'); setStudents(data)
    }catch(e){ /* optional */ }
  }

  useEffect(()=>{ load() },[])

  const create = async (e)=>{ e.preventDefault(); await API.post('/university/workshop',{ title }); setTitle(''); load() }
  const approveStudent = async (id)=>{ await API.post(`/university/approve-student/${id}`); load() }

  return (
    <div>
      <h2>University Dashboard</h2>
      <form onSubmit={create} className="card">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Workshop title" required />
        <button>Create Workshop</button>
      </form>

      <h3>Your Workshops</h3>
      <ul>{workshops.map(w=><li key={w._id} className="card">{w.title} - {new Date(w.date||w.createdAt).toLocaleString()}</li>)}</ul>

      <h3>Pending Students</h3>
      <ul>{students.map(s=> <li key={s._id} className="card">{s.name} - {s.email} <button onClick={()=>approveStudent(s._id)}>Approve</button></li>)}</ul>
    </div>
  )
}
