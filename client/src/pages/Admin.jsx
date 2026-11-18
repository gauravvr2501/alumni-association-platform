import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function Admin() {
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const validAdmin = "admin";
    const validPassword = "admin123";

    if (adminName === validAdmin && adminPassword === validPassword) {
      setMsg("✅ Welcome, Admin!");
      setTimeout(() => {
        navigate("/admin-dashboard"); // ✅ navigate to dashboard
      }, 1000); // Delay to show message
    } else {
      setMsg("❌ Invalid credentials");
    }
  };

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h4 className="text-center mb-4">
          Admin Login <i className="bi bi-person-lock"></i>
        </h4>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter admin name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i> Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
           

          