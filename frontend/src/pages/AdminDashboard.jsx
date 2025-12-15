// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";
import {
  PiBuildingsBold,
  PiClockCountdownBold,
  PiUsersThreeBold,
  PiChartLineUpBold
} from "react-icons/pi";
import { PiNotebookBold } from "react-icons/pi";

export default function AdminDashboard() {
  const [unis, setUnis] = useState([]);

  const load = async () => {
    try {
      const { data } = await API.get("/admin/universities");
      setUnis(data);
    } catch (err) {
      alert("Error loading data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await API.post(`/admin/approve/${id}`);
    load();
  };

  const reject = async (id) => {
    await API.post(`/admin/reject/${id}`);
    load();
  };
  const [totalWorkshops, setTotalWorkshops] = useState(0);

useEffect(() => {
  API.get("/admin/stats").then(res => {
    setTotalWorkshops(res.data.totalWorkshops);
  });
}, []);



  const performance = 82.5;

  return (
    <DashboardLayout user="Admin">
      <div className="wh-main-content">

        {/* --- Stat Cards (Upgraded) --- */}
        <div className="wh-stats-row">

          {/* CARD 1 */}
          <div className="card stat-box">
            <div className="stat-icon modern"><PiBuildingsBold /></div>
            <div className="stat-title">Total Universities</div>
            <div className="stat-value">{unis.length}</div>
          </div>

          {/* CARD 2 — Pending Approvals + Trend */}
          <div className="card stat-box">
            <div className="stat-icon modern"><PiClockCountdownBold /></div>
            <div className="stat-title">Pending Approvals</div>
            <div className="stat-value">
              {unis.filter(x => x.status === "pending").length}
            </div>

            {/* Mini Trend Line */}
            <div className="mini-trend">
              <div className="bar-fill"></div>
            </div>
            <div className="mini-info">+3 this week</div>
          </div>

          {/* CARD 3 — Admins + Security Status */}
          <div className="card stat-box">
            <div className="stat-icon modern"><PiUsersThreeBold /></div>
            <div className="stat-title">Admins</div>
            <div className="stat-value">1</div>

            <div className="admin-status">
              <span className="status-dot green"></span>
              <span>System Secure</span>
            </div>
          </div>

          {/* CARD 4 — Performance + Improvement */}
          <div className="card stat-box">
  <div className="stat-icon">
    <PiNotebookBold />
  </div>

  <div className="stat-title">Active Workshops</div>

  <div className="stat-value">
    {totalWorkshops}
  </div>

  <div className="stat-subtext">
    Across all universities
  </div>
</div>


        </div>

        {/* --- Table Section --- */}
        <div className="card table-card full-width">
          <h3>University Requests</h3>

          <div className="table-scroll">
            <table className="wh-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {unis.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td className={`status ${u.status}`}>{u.status}</td>
                    <td>
                      {u.status === "pending" && (
                        <>
                          <button className="btn" onClick={() => approve(u._id)}>
                            Approve
                          </button>
                          <button className="btn outline" onClick={() => reject(u._id)}>
                            Reject
                          </button>
                        </>
                      )}
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
