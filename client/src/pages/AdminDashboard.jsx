import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaBriefcase,FaPlus } from "react-icons/fa";
import axios from "axios";
import AddJobForm from "../components/AddJobForm"; 
import AddEventForm from "../components/AddEventForm";


export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [alumni, setAlumni] = useState([]);
  const [applications, setApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  
  // Add Job form states
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobSuccessMsg, setJobSuccessMsg] = useState("");

  // Add Event form states
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventSuccessMsg, setEventSuccessMsg] = useState("");


  useEffect(() => {
    // Common fetch for dashboard cards
    if (activePage === "home") {
      axios.get("https://alumni-association-backend.onrender.com/api/alumni")
        .then(res => setAlumni(res.data))
        .catch(err => console.error("Error fetching alumni:", err));

      axios.get("https://alumni-association-backend.onrender.com/api/jobs/admin/applications")
        .then(res => setApplications(res.data))
        .catch(err => console.error("Error fetching job applications:", err));

      axios.get("https://alumni-association-backend.onrender.com/api/donations")
        .then(res => setDonations(res.data))
        .catch(err => console.error("Error fetching donations:", err));

      axios.get("https://alumni-association-backend.onrender.com/api/events/event-registrations")
        .then(res => setEventRegistrations(res.data))
        .catch(err => console.error("Error fetching event registrations:", err));  
    }

    if (activePage === "manageAlumni") {
      axios.get("https://alumni-association-backend.onrender.com/api/alumni")
        .then(res => setAlumni(res.data))
        .catch(err => console.error("Error fetching alumni:", err));
    }

    if (activePage === "jobApplications") {
      axios.get("https://alumni-association-backend.onrender.com/api/jobs/admin/applications")
        .then(res => setApplications(res.data))
        .catch(err => console.error("Error fetching job applications:", err));
    }

    if (activePage === "donationManagement") {
      axios.get("https://alumni-association-backend.onrender.com/api/donations")
        .then(res => setDonations(res.data))
        .catch(err => console.error("Error fetching donations:", err));
    }

    if (activePage === "eventRegistrations") {
      axios.get("https://alumni-association-backend.onrender.com/api/events/event-registrations")
        .then(res => setEventRegistrations(res.data))
        .catch(err => console.error("Error fetching event registrations:", err));
}
  }, [activePage]);

   // Handler for Add Job form submit
  const handleAddJob = async (e) => {
    e.preventDefault();
    setJobSuccessMsg("");
    try {
      const newJob = {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        deadline: jobDeadline,
      };
  
   
  await axios.post("https://alumni-association-backend.onrender.com/api/jobs/add", newJob);

      setJobSuccessMsg("Job added successfully!");
      // Clear form fields
      setJobTitle("");
      setJobDescription("");
      setJobLocation("");
      setJobDeadline("");

      // Optionally switch to job applications page or keep showing add job form
      setActivePage("jobApplications");
      
    } catch (error) {
      console.error("Error adding job:", error);
      setJobSuccessMsg("Failed to add job. Please try again.");
    }
  };   
  
  // Add Event Handler
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setEventSuccessMsg("");
    try {
      const newEvent = {
        title: eventTitle,
        description: eventDescription,
        location: eventLocation,
        date: eventDate,
      };

      await axios.post("https://alumni-association-backend.onrender.com/api/events/add-event", newEvent);

      setEventSuccessMsg("Event added successfully!");
      setEventTitle("");
      setEventDescription("");
      setEventLocation("");
      setEventDate("");

      // Optionally navigate to eventRegistrations or keep form
      setActivePage("eventRegistrations");
    } catch (error) {
      console.error("Error adding event:", error);
      setEventSuccessMsg("Failed to add event. Please try again.");
    }
  };
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ minHeight: "100vh", width: "220px" }}>
        <h5 className="mb-4">
          <FaHome className="me-2" />
          Admin Panel
        </h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white ${activePage === "home" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("home")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              🏠 Home
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white ${activePage === "manageAlumni" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("manageAlumni")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              <FaUsers className="me-2" />Manage Alumni
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white ${activePage === "jobApplications" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("jobApplications")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              <FaBriefcase className="me-2" />Manage Job Applications
            </button>
          </li>
          {/* New Add Job menu */}
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white ${activePage === "addJob" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("addJob")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              <FaPlus className="me-2" />Add Job
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
             className={`nav-link text-white ${activePage === "addEvent" ? "fw-bold" : ""}`}
             onClick={() => setActivePage("addEvent")}
             style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
            📆 Add Event
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white ${activePage === "donationManagement" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("donationManagement")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              💰 Manage Donations
            </button>
          </li>
          <li className="nav-item mb-2">
           <button
              className={`nav-link text-white ${activePage === "eventRegistrations" ? "fw-bold" : ""}`}
              onClick={() => setActivePage("eventRegistrations")}
              style={{ background: "none", border: "none", textAlign: "left", padding: 0 }}
            >
              📅 Manage Event Registrations
            </button>
         </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4 w-100">
        {/* Home Section */}
        {activePage === "home" && (
          <>
            <h3 className="mb-4">Dashboard Overview</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Alumni</h5>
                    <p className="card-text fs-3">{alumni.length}</p>
                  </div>
                </div> 
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Job Applications</h5>
                    <p className="card-text fs-3">{applications.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Donations</h5>
                    <p className="card-text fs-3">{donations.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Event Registrations</h5>
                    <p className="card-text fs-3">{eventRegistrations.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <p>Welcome to the admin panel. You can manage alumni, job applications, and donations from here.</p>
          </>
        )}

        {/* Manage Alumni */}
        {activePage === "manageAlumni" && (
          <>
            <h3 className="mb-4">Manage Alumni</h3>
            {alumni.length === 0 ? (
              <p>No alumni found.</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Graduation Year</th>
                  </tr>
                </thead>
                <tbody>
                  {alumni.map((alum, index) => (
                    <tr key={index}>
                      <td>{alum.name}</td>
                      <td>{alum.email}</td>
                      <td>{alum.graduationYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* Manage Job Applications */}
        {activePage === "jobApplications" && (
          <>
            <h3 className="mb-4">Manage Job Applications</h3>
            {applications.length === 0 ? (
              <p>No job applications found.</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Alumni Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Applied At</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index}>
                      <td>{app.alumniId?.name}</td>
                      <td>{app.alumniId?.email}</td>
                      <td>{app.jobId?.title}</td>
                      <td>{new Date(app.appliedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} 
          </>
        )}

        {/* Add Job Form */}
        {activePage === "addJob" && (
          <AddJobForm
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            jobLocation={jobLocation}
            setJobLocation={setJobLocation}
            jobDeadline={jobDeadline}
            setJobDeadline={setJobDeadline}
            handleAddJob={handleAddJob}
            jobSuccessMsg={jobSuccessMsg}
          />
        )}

        {/* Add Event Form */}
       {activePage === "addEvent" && (
       <AddEventForm
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventLocation={eventLocation}
        setEventLocation={setEventLocation}
        eventDate={eventDate}
        setEventDate={setEventDate}
        handleAddEvent={handleAddEvent}
        eventSuccessMsg={eventSuccessMsg}
        />
        )}



        {/* Manage Donations */}
        {activePage === "donationManagement" && (
          <>
            <h3 className="mb-4">Manage Donations</h3>
            {donations.length === 0 ? (
              <p>No donations found.</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Alumni Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, index) => (
                    <tr key={index}>
                      <td>{donation.alumniId?.name}</td>
                      <td>{donation.alumniId?.email}</td>
                      <td>₹{donation.amount}</td>
                      <td>{new Date(donation.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* Manage Event Registrations */}
{activePage === "eventRegistrations" && (
  <>
    <h3 className="mb-4">Manage Event Registrations</h3>
    {eventRegistrations.length === 0 ? (
      <p>No event registrations found.</p>
    ) : (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Alumni Name</th>
            <th>Email</th>
            <th>Event Title</th>
          </tr>
        </thead>
        <tbody>
          {eventRegistrations.map((reg, index) => (
            <tr key={index}>
              <td>{reg.alumniId?.name}</td>
              <td>{reg.alumniId?.email}</td>
              <td>{reg.eventId?.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
)}
      </div>
    </div>
  );
}

