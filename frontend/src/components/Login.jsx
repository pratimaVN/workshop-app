import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import ManImage from "../assets/login-man.png"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      if (!data.token) return alert("Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "university") navigate("/university");
      else navigate("/student");

    } catch {
      alert("Error occurred");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-shape login-bg-1"></div>
      <div className="login-bg-shape login-bg-2"></div>

      <div className="login-wrapper">
        <div className="login-card">

          <div className="login-left">
            <div className="login-logo">wel<span>come</span></div>
            <h2 className="login-title">User Login</h2>

            <form className="login-form" onSubmit={handle}>
              
              <div className="login-field">
                <label>Email</label>
                <input type="email" placeholder="mail@gmail.com"
                  value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>

              <div className="login-field">
                <label>Password</label>
                <input type="password" placeholder="******"
                  value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>

              <button className="login-btn">LOGIN</button>

              <div className="login-footer-text">
                Don’t have an account?
                <button className="link-btn" onClick={()=>navigate("/signup")}>
                  Register now
                </button>
              </div>
            </form>
          </div>

          <div className="login-right">
            <div className="illustration-wrapper">
              <img src={ManImage} className="man-image" alt="login" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
