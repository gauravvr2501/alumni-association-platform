import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLocationArrow, FaRegClock } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa6';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };
           
  const handleApply = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/jobs/apply-job',
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setAppliedJobs([...appliedJobs, jobId]); // Mark as applied
    } catch (err) {
      if (err.response && err.response.data.message === 'Already applied!') {
        setMessage('You have already applied for this job.');
      } else {
        setMessage('Error occurred while applying.');
      }
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🎯 Find Your Dream Job</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4" key={job._id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title"><FaBriefcase /> {job.title}</h5>
                <small className="text-muted">Company: {job.company}</small>
                <p className="card-text">{job.description}</p>
                <p><FaLocationArrow /> {job.location}</p>
                <p><FaRegClock /> Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleApply(job._id)}
                  disabled={appliedJobs.includes(job._id)}
                >
                  {appliedJobs.includes(job._id) ? 'Already Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
