import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Left Side - About Us */}
          <div className="col-md-6">
            <h5>About Us</h5> 
            <p className="mb-2">
              This Alumni Association Platform helps alumni stay connected with their college. It offers jobs, events, stories, and donation options — all in one place.
            </p>
            <small>&copy; {new Date().getFullYear()} Alumni Association. All rights reserved.</small>
          </div>

          {/* Right Side - Contact Us */}
          <div className="col-md-6 text-md-end mt-4 mt-md-0">
            <h5>Contact Us</h5>
            <p className="mb-1">
              <i className="bi bi-telephone-fill me-2"></i>7676234167
            </p>
            <p className="mb-1">
              <i className="bi bi-envelope-at-fill me-2"></i>support@gmail.com
            </p>
            <Link to="/admin" className="btn btn-outline-light btn-sm mt-2">
              <i className="bi bi-person-gear me-1"></i>Admin 
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
