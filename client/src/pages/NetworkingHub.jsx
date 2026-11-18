import React, { useState } from "react";

// Sample alumni data (Replace with API data later)
const alumniList = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    location: "Bengaluru, India",
    industry: "Technology",
    image: "",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Data Scientist",
    company: "Microsoft",
    location: "Hyderabad, India",
    industry: "Data Science",
    image: "",
  },
  {
    id: 3,
    name: "Anjali Menon",
    role: "Founder",
    company: "EduBridge",
    location: "Kochi, India",
    industry: "Education",
    image: "",
  },
  
];

export default function NetworkingHub() {
  const [search, setSearch] = useState("");

  // Filter alumni by name, location, or industry
  const filteredAlumni = alumniList.filter(
    (alumni) =>
      alumni.name.toLowerCase().includes(search.toLowerCase()) ||
      alumni.location.toLowerCase().includes(search.toLowerCase()) ||
      alumni.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤝 Alumni Networking Hub</h2>
      <p className="text-center mb-4">
        Connect with alumni across industries, locations, and professions.
      </p>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, location, or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Alumni Cards */}
      <div className="row">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni) => (
            <div className="col-md-4 mb-4" key={alumni.id}>
              <div className="card shadow h-100 text-center" style={{ borderRadius: "15px" }}>
                
                {/* Profile Icon / Image */}
                {alumni.image ? (
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="rounded-circle mx-auto mt-4"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      border: "3px solid #ddd",
                    }}
                  />
                ) : (
                  <i
                    className="bi bi-person-circle text-secondary mt-4"
                    style={{ fontSize: "5rem" }}
                  ></i>
                )}

                <div className="card-body">
                  <h5>{alumni.name}</h5>
                  <p className="text-muted mb-1">{alumni.role} at {alumni.company}</p>
                  <p className="small text-secondary mb-2">{alumni.location} • {alumni.industry}</p>
                  <button className="btn btn-primary btn-sm">
                    <i className="bi bi-person-plus"></i> Connect
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No alumni found.</p>
        )}
      </div>
    </div>
  );
}


