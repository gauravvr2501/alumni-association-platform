import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // ✅ for navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/alumni/signup", form);
      setSuccess("Signup successful!");

      // ✅ Save alumniId to localStorage
      localStorage.setItem("alumniId", res.data.alumniId);

      setForm({ name: "", email: "", password: "", graduationYear: "" });

      // ✅ Redirect to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed. Try again.");
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
        bottom: 0
      }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <h4 className="text-center mb-4">
          Alumni Sign Up <i className="bi bi-person-plus-fill"></i>
        </h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., 2022"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i> Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
