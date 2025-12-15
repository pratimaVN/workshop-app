import React, { useEffect, useState } from "react";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";

export default function UniversityDashboard() {

  const [title, setTitle] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [students, setStudents] = useState([]);

  const load = async () => {
    try {
      const wRes = await API.get("/university/workshops");
      setWorkshops(wRes.data);
    } catch {}

    try {
      const sRes = await API.get("/university/students");
      setStudents(sRes.data);
    } catch {}
  };

  useEffect(() => {
    load();
  }, []);

  // CREATE WORKSHOP
  const create = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await API.post("/university/workshop", { title });
      setWorkshops(prev => [...prev, data]); // instant UI update
      setTitle("");
    } catch {
      alert("Failed to create workshop");
    }
  };

  // DELETE WORKSHOP
  const deleteWorkshop = async (id) => {
    if (!window.confirm("Delete this workshop?")) return;

    try {
      await API.delete(`/university/workshop/${id}`);

      // ✅ remove from UI immediately
      setWorkshops(prev => prev.filter(w => w._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // APPROVE STUDENT
  const approveStudent = async (id) => {
    await API.post(`/university/approve-student/${id}`);
    setStudents(prev => prev.filter(s => s._id !== id));
  };

  // REJECT STUDENT
  const rejectStudent = async (id) => {
    await API.post(`/university/reject-student/${id}`);
    setStudents(prev => prev.filter(s => s._id !== id));
  };

  return (
    <DashboardLayout user="University">
      <div className="wh-main-content">

        {/* STATS */}
        <div className="wh-stats-row">
          <div className="card stat-box">
            <div className="stat-title">Total Workshops</div>
            <div className="stat-value">{workshops.length}</div>
          </div>

          <div className="card stat-box">
            <div className="stat-title">Pending Students</div>
            <div className="stat-value">{students.length}</div>
          </div>
        </div>

        {/* CREATE WORKSHOP BAR */}
        <div className="card">
          <h3>Create Workshop</h3>

          <form className="create-bar" onSubmit={create}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Workshop Title"
              required
            />
            <button type="submit" className="create-btn">
              Create
            </button>
          </form>
        </div>

        {/* WORKSHOPS TABLE */}
        <div className="card table-card">
          <h3>Your Workshops</h3>

          <div className="table-scroll">
            <table className="wh-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {workshops.map(w => (
                  <tr key={w._id}>
                    <td>{w.title}</td>
                    <td>{new Date(w.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn outline danger"
                        onClick={() => deleteWorkshop(w._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {workshops.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", opacity: 0.6 }}>
                      No workshops created
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PENDING STUDENTS */}
        <div className="card table-card">
          <h3>Pending Students</h3>

          <div className="table-scroll">
            <table className="wh-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>
                      <button className="btn" onClick={() => approveStudent(s._id)}>
                        Approve
                      </button>
                      <button
                        className="btn outline danger"
                        onClick={() => rejectStudent(s._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", opacity: 0.6 }}>
                      No pending students
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
