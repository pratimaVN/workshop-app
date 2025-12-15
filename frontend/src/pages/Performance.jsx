import React, { useEffect, useState } from "react";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Performance() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/performance")
      .then(res => setStats(res.data))
      .catch(() => alert("Failed to load performance data"));
  }, []);

  if (!stats) {
    return (
      <DashboardLayout user="Admin">
        <div className="wh-main-content">Loading...</div>
      </DashboardLayout>
    );
  }

  const barData = [
    { name: "Universities", value: stats.totalUniversities },
    { name: "Approved", value: stats.approvedUniversities },
    { name: "Students", value: stats.totalStudents },
    { name: "Workshops", value: stats.totalWorkshops }
  ];

  const pieData = [
    { name: "Universities", value: stats.totalUniversities },
    { name: "Workshops", value: stats.totalWorkshops }
  ];

  return (
    <DashboardLayout user="Admin">
      <div className="wh-main-content">

        {/* BAR CHART */}
        <div className="card">
          <h3>Platform Overview</h3>
          <BarChart width={600} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>

        {/* DONUT CHART */}
        <div className="card">
          <h3>Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      </div>
    </DashboardLayout>
  );
}
