import React, { useState, useEffect } from "react";
import "../workhub-dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";

// Icons
import { FaUserCircle } from "react-icons/fa";
import {
  MdNotificationsNone,
  MdOutlineMessage,
  MdOutlineDarkMode,
  MdSearch,
  MdFlashOn
} from "react-icons/md";

import {
  LuZap,
  LuLayoutDashboard,
  LuSchool,
  LuUsers,
  LuBriefcaseBusiness,
  LuActivity,
  LuLogOut,
} from "react-icons/lu";

export default function DashboardLayout({ children, user }) {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("teal");

  // ✅ DUMMY DATA (SAFE – NO BACKEND REQUIRED)
  const [notifications] = useState([]);
  const [messages] = useState([]);

  // ✅ Theme logic
  useEffect(() => {
    document.body.classList.remove(
      "theme-blue",
      "theme-teal",
      "theme-dark",
      "theme-sunshine",
      "theme-avengers"
    );
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className={`workhub-page ${collapsed ? "collapsed" : ""}`}>

      {/* SIDEBAR */}
      <aside className="wh-sidebar">
        <div className="wh-logo">
          <LuZap className="logo-icon" />
          <span className="logo-text">WorkHub</span>
        </div>

        <nav className="wh-nav">
          <NavLink to="/admin" className="nav-item">
            <LuLayoutDashboard className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/university" className="nav-item">
            <LuSchool className="nav-icon" />
            <span>Workshops</span>
          </NavLink>

          <NavLink to="/student" className="nav-item">
            <LuUsers className="nav-icon" />
            <span>Students</span>
          </NavLink>

          <NavLink to="/faculty" className="nav-item">
            <LuBriefcaseBusiness className="nav-icon" />
            <span>Faculty</span>
          </NavLink>

          <NavLink to="/performance" className="nav-item">
            <LuActivity className="nav-icon" />
            <span>Performance</span>
          </NavLink>

          <NavLink to="/" className="nav-item logout-btn">
            <LuLogOut className="nav-icon" />
            <span>Logout</span>
          </NavLink>
        </nav>

        <div className="wh-footer">
          <div className="status-dot"></div>
          <span>zwiee 2025</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className="wh-main">

        {/* TOPBAR */}
        <header className="wh-topbar">
          <div className="wh-left">
            <h1>Welcome to WorkHub</h1>
            <p className="muted">Hi, {user}. Welcome back.</p>
          </div>

          <div className="wh-right">

            {/* Search */}
            <div className="top-search">
              <MdSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <MdFlashOn className="quick-icon" />
              <div className="dropdown quick-dropdown">
                <p onClick={() => navigate("/university")}>Create Workshop</p>
                <p onClick={() => navigate("/performance")}>Generate Report</p>
              </div>
            </div>

            {/* Notifications */}
            <div className="icon-wrapper">
              <span className="badge">0</span>
              <MdNotificationsNone className="top-icon" />
              <div className="dropdown notif-dropdown">
                <p>No notifications</p>
              </div>
            </div>

            {/* Messages */}
            <div className="icon-wrapper">
              <span className="badge blue">0</span>
              <MdOutlineMessage className="top-icon" />
              <div className="dropdown msg-dropdown">
                <p>No messages</p>
              </div>
            </div>

            {/* Theme */}
            <button
              className={`theme-btn ${theme === "sunshine" ? "active" : ""}`}
              onClick={() => setTheme("sunshine")}
            >
              Sunshine
            </button>

            <MdOutlineDarkMode
              className="darkmode-icon"
              onClick={() => setTheme(theme === "dark" ? "teal" : "dark")}
            />

            {/* Profile */}
            <div className="profile-wrapper">
              <FaUserCircle className="avatar-icon" />
              <div className="dropdown profile-dropdown">
                <a href="#">My Profile</a>
                
                <a href="/">Logout</a>
              </div>
            </div>

          </div>
        </header>

        <section className="wh-content">{children}</section>
      </main>
    </div>
  );
}
