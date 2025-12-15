import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles.css";
import ManImage from "../assets/login-man.png";

export default function Signup() {
  const navigate = useNavigate();

  /* ================= STATES (FIRST!) ================= */
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
 


  /* ================= HELPERS ================= */

  // ✅ Capitalize first letter of each word
  const capitalizeName = (value) =>
    value.replace(/\b\w/g, (char) => char.toUpperCase());

  // ✅ Password strength
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
const isStrongPassword = () => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password)
  );
};

  /* ================= FETCH UNIVERSITIES ================= */
  useEffect(() => {
    if (role !== "student") return;
    (async () => {
      const { data } = await API.get("/auth/universities-public");
      setUniversities(data.map(u => ({ value: u._id, label: u.name })));
    })();
  }, [role]);

  /* ================= EMAIL CHECK ================= */
  const checkEmail = async () => {
    if (!email) return;
    const res = await API.post("/auth/check-email", { email });
    setEmailExists(res.data.exists);
  };

  /* ================= FORM VALIDATION ================= */
  const isFormValid =
    name &&
    email &&
    password &&
    strength === 4 &&
    !emailExists &&
    ((role === "student" && selectedUniversity) ||
      (role === "university" && universityName) ||
      role === "admin");

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    const body = { name, email, password, role };
    if (role === "student") body.universityId = selectedUniversity.value;
    if (role === "university") body.universityName = universityName;

    await API.post("/auth/signup", body);
    alert("Signup Successful");
    navigate("/");
  };

  /* ================= JSX ================= */
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">

          {/* LEFT */}
          <div className="login-left">
            <h2 className="login-title">Create Account</h2>

            <form className="login-form" onSubmit={submit}>

              {/* FULL NAME */}
              <div className="login-field">
                <label>Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(capitalizeName(e.target.value))}
                  required
                />
                {name && (
                  <small style={{ color: "#009688" }}>
                    Preview: {name}
                  </small>
                )}
              </div>

              {/* EMAIL */}
              <div className="login-field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onBlur={checkEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailExists && (
                  <small className="error-text">Email already exists</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="login-field password-field">
  <label>Password</label>

  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  {/* SHOW ONLY WHEN PASSWORD IS INVALID */}
  {password && !isStrongPassword() && (
    <small className="pass-error">
      Password must contain:
      <ul>
        <li>At least 8 characters,1 uppercase letter,1 number,1 special character</li>
      </ul>
    </small>
  )}
</div>



              {/* ROLE */}
              <div className="login-field">
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="role-select"
                >
                  <option value="student">Student</option>
                  <option value="university">University</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* UNIVERSITY NAME */}
              {role === "university" && (
                <div className="login-field">
                  <label>University Name</label>
                  <input
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                  />
                </div>
              )}

              {/* UNIVERSITY SELECT */}
              {role === "student" && (
                <div className="login-field">
                  <label>Select University</label>
                  <Select
                    options={universities}
                    value={selectedUniversity}
                    onChange={setSelectedUniversity}
                  />
                </div>
              )}

              <button className="login-btn" disabled={!isFormValid}>
                Sign Up
              </button>

            </form>
          </div>

          {/* RIGHT */}
          <div className="login-right">
            <img src={ManImage} className="man-image" alt="signup" />
          </div>

        </div>
      </div>
    </div>
  );
}