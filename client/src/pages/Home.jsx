import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user,setUser] = useState("")

useEffect(() => {
  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const res = await axios.get("https://alumni-association-backend.onrender.com/api/alumni/check", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(res);
      

      if (res.data.loggedIn) {
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }

      
        setUser(res.data.user.name)
      
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  };

  checkLogin();
}, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/alumni/logout");
      localStorage.removeItem("alumniId"); // ✅ Clear JWT
      localStorage.removeItem("token"); // ✅ Clear JWT
      setIsLoggedIn(false);
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div style={{ width: '100vw', margin: 0, padding: 0 }} className="min-vh-100">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-dark bg-primary py-3 px-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h3 className="navbar-brand m-0">
            <i className="bi bi-people-fill me-2"></i>
            Alumni Association Platform
          </h3>
          <div>
  {isLoggedIn ? (
    <>
      <div className="d-flex align-items-center gap-3">
        {/* Profile Icon + Name */}
        <div className="d-flex align-items-center text-white">
          <i className="bi bi-person-circle me-2" style={{ fontSize: "1.5rem" }}></i>
          <span>{user}</span>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-outline-light">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>
    </>
  ) : (
    <>
      <Link to="/login" className="btn btn-outline-light me-2">
        <i className="bi bi-box-arrow-in-right me-1"></i> Login
      </Link>
      <Link to="/signup" className="btn btn-light">
        <i className="bi bi-person-plus-fill me-1"></i> Signup
      </Link>
    </>
  )}
</div>

        </div>
      </header>
      
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-3"><Link className="nav-link" to="/Jobs">💼 Jobs</Link></li>
            <li className="nav-item mx-3"><Link className="nav-link" to="/events">📅 Events</Link></li>
            <li className="nav-item mx-3"><Link className="nav-link" to="/success-stories">🌟 Success Stories</Link></li>
            <li className="nav-item mx-3"><Link className="nav-link" to="/donation">💰 Donations</Link></li>
            <li className="nav-item mx-3"><Link className="nav-link" to="/networking"><i className="bi bi-people-fill me-1"></i> Networking Hub</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="h3" style={{ textDecoration: 'underline' }}>
              Welcome to Alumni <span style={{ color: 'blue' }}>Portal</span>
            </h1>
            <p className="fs-5 mt-4">
              This project connects alumni with their college through job listings, event updates,
              success stories, and donation options — all in one place.
            </p>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img src="/alumni.jpg" alt="Alumni" className="img-fluid rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}





              