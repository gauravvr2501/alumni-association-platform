import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [registeredEventIds, setRegisteredEventIds] = useState([]);

  useEffect(() => {
    axios.get('https://alumni-association-backend.onrender.com/api/events/all-events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `https://alumni-association-backend.onrender.com/api/events/register/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setRegisteredEventIds([...registeredEventIds, eventId]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>🎉 Upcoming Alumni Events</h2>
        <p className="text-muted">
          Explore and register for exciting alumni events. Stay connected and grow your network!
        </p>
      </div>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleRegister(event._id)}
                  disabled={registeredEventIds.includes(event._id)}
                >
                  {registeredEventIds.includes(event._id) ? 'Registered' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
 