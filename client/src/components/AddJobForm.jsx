import React, { useState } from "react";
import axios from "axios";

export default function AddJobForm({ onJobAdded }) {
  const [title, setTitle] = useState("");
  const [company, setCompany]=useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = { title, company, description, location, deadline };
      const res = await axios.post("http://localhost:5000/api/jobs/add", jobData);
      setMessage(res.data.message || "Job added successfully!");

      setTitle("");
      setCompany("");
      setDescription("");
      setLocation("");
      setDeadline("");

      if (onJobAdded) onJobAdded();
    } catch (err) {
      setMessage("Failed to add job. Please try again.");
      console.error(err);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-4" style={{ maxWidth: "500px" }}>
      {message && <div className="alert alert-info">{message}</div>}
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        className="form-control mb-2"
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-success">Add Job</button>
    </form>
  );
}
