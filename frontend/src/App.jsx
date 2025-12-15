import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UniversityDashboard from "./pages/UniversityDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Faculty from "./pages/Faculty";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // hide navbar only on login/signup pages
  const hideNav = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {/* top navbar only for login & signup */}
      {/* {hideNav && (
        <header style={{textAlign:"center", padding:"15px", fontSize:"22px", fontWeight:"600"}}>
          Workshop Management System
        </header>
      )} */}

      <Routes>
        <Route path="/faculty" element={<Faculty />} />
<Route path="/performance" element={<Performance />} />
<Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* dashboard UI handled inside DashboardLayout */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/university" element={<UniversityDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </>
  );
}
