import React, {useEffect, useState} from 'react'
import API from '../api'

export default function AdminDashboard(){
  const [unis,setUnis] = useState([])
  const fetch = async ()=>{
    try{
      const { data } = await API.get('/admin/universities')
      setUnis(data)
    }catch(e){ alert('Error fetching') }
  }
  useEffect(()=>{ fetch() },[])
  const approve = async (id)=>{ await API.post(`/admin/approve/${id}`); fetch() }
  const reject = async (id)=>{ await API.post(`/admin/reject/${id}`); fetch() }
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {unis.map(u=> (
          <li key={u._id} className="card">
            <strong>{u.name}</strong> — {u.status}
            {u.status==='pending' && <>
              <button onClick={()=>approve(u._id)}>Approve</button>
              <button onClick={()=>reject(u._id)}>Reject</button>
            </>}
          </li>
        ))}
      </ul>
    </div>
  )
}
