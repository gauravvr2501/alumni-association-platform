import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    deadline: ''
  });

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs/admin/applications');
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      setSuccessMsg("✅ Job added successfully!");
      setShowForm(false);
      setFormData({ title: '', description: '', location: '', deadline: '' });

      // If you want jobs.jsx to refresh automatically, emit an event or update global state here
    } catch (error) {
      console.error('Error adding job:', error);
      setSuccessMsg("❌ Failed to add job.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Job Applications</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : '➕ Add Job'}
        </button>
      </div>

      {successMsg && <div className="alert alert-info">{successMsg}</div>}

      {showForm && (
        <form onSubmit={handleAddJob} className="mb-4 border p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input type="text" name="title" className="form-control" required value={formData.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" required value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" name="location" className="form-control" required value={formData.location} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Deadline</label>
            <input type="date" name="deadline" className="form-control" required value={formData.deadline} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit Job</button>
        </form>
      )}

      {loading ? (
        <p>Loading job applications...</p>
      ) : applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Alumni Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.alumniId?.name || 'N/A'}</td>
                <td>{app.alumniId?.email || 'N/A'}</td>
                <td>{app.jobId?.title || 'N/A'}</td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageJobs;


