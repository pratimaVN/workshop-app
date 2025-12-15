import React from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout user={user?.role}>
      <div className="wh-main-content">

        <div className="card">
          <h3>Account Settings</h3>

          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <hr style={{ margin: "16px 0" }} />

          <p style={{ opacity: 0.7 }}>
            Profile update and password change functionality can be added in
            future enhancements.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
