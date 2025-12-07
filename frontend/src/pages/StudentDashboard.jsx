import React, {useEffect, useState} from 'react'
import API from '../api'

export default function StudentDashboard(){
  const [workshops,setWorkshops]=useState([])
  const load = async ()=>{ try{ const {data} = await API.get('/student/workshops'); setWorkshops(data) }catch(e){ console.log(e) } }
  useEffect(()=>{ load() },[])
  const register = async (id)=>{ await API.post(`/student/register/${id}`); alert('Registered'); load() }
  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>{workshops.map(w=> <li key={w._id} className="card">{w.title} <button onClick={()=>register(w._id)}>Register</button></li>)}</ul>
    </div>
  )
}
