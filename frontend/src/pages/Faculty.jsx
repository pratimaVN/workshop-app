import React, { useEffect, useState } from "react";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  const load = async () => {
    const { data } = await API.get("/faculty");
    setFaculty(data);
  };

  useEffect(() => { load(); }, []);

  const addFaculty = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/faculty", form);
    setFaculty(prev => [...prev, data]);
    setForm({ name: "", email: "", department: "" });
  };

  const remove = async (id) => {
    await API.delete(`/faculty/${id}`);
    setFaculty(prev => prev.filter(f => f._id !== id));
  };

  return (
    <DashboardLayout user="University">
      <div className="wh-main-content">

        <div className="card">
          <h3>Add Faculty</h3>

          <form className="form-row" onSubmit={addFaculty}>
            <input placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />

            <input placeholder="Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />

            <input placeholder="Department" value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })} />

            <button className="btn">Add</button>
          </form>
        </div>

        <div className="card table-card">
          <h3>Faculty List</h3>

          <table className="wh-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Department</th><th>Action</th>
              </tr>
            </thead>

            <tbody>
              {faculty.map(f => (
                <tr key={f._id}>
                  <td>{f.name}</td>
                  <td>{f.email}</td>
                  <td>{f.department}</td>
                  <td>
                    <button className="btn outline danger"
                      onClick={() => remove(f._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {faculty.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>
                  No faculty added
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}
