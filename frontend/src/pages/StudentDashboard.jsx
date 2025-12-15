import React, { useEffect, useState } from "react";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";
import { PiNotebookBold, PiCheckCircleBold } from "react-icons/pi";

export default function StudentDashboard() {

  const [workshops, setWorkshops] = useState([]);

  const load = async () => {
    try {
      const { data } = await API.get("/student/workshops");
      setWorkshops(data);
    } catch (e) {}
  };

  useEffect(() => { load(); }, []);

  const register = async (id) => {
    await API.post(`/student/register/${id}`);
    alert("Registered!");
    load();
  };

  return (
    <DashboardLayout user="Student">
      <div className="wh-main-content">

        {/* Stats */}
        <div className="wh-stats-row">

          <div className="card stat-box">
            <div className="stat-icon modern"><PiNotebookBold /></div>
            <div className="stat-title">Available Workshops</div>
            <div className="stat-value">{workshops.length}</div>
          </div>

          <div className="card stat-box">
            <div className="stat-icon modern"><PiCheckCircleBold /></div>
            <div className="stat-title">Registered</div>
            <div className="stat-value">0</div>
          </div>

        </div>

        {/* Workshops Table */}
        <div className="card table-card full-width">
          <h3>Workshops List</h3>

          <div className="table-scroll">
            <table className="wh-table">
              <thead>
                <tr><th>Title</th><th>Action</th></tr>
              </thead>

              <tbody>
                {workshops.map(w => (
                  <tr key={w._id}>
                    <td>{w.title}</td>
                    <td>
                      <button className="btn" onClick={() => register(w._id)}>
                        Register
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
