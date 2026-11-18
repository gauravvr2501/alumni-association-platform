import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate(); // ✅ for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/alumni/login", {
        email,
        password,
      });

      // ✅ Save JWT token and alumni ID
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("alumniId", res.data.alumniId); // This line was missing

      setMsg("✅ Login successful!");

      // ✅ Redirect to home page after login
      navigate("/");

    } catch (err) {
      setMsg(err.response?.data?.error || "❌ Login failed");
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
          Alumni Login <i className="bi bi-box-arrow-in-right"></i>
        </h4>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-door-open me-2"></i> Login
          </button>
        </form>
      </div>
    </div>
  );
}
