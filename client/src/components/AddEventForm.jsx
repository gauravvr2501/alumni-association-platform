import React from "react";

export default function AddEventForm({
  eventTitle,
  setEventTitle,
  eventDescription,
  setEventDescription,
  eventLocation,
  setEventLocation,
  eventDate,
  setEventDate,
  handleAddEvent,
  eventSuccessMsg
}) {
  return (
    <div>
      <h3 className="mb-4">Add Event</h3>
      <form onSubmit={handleAddEvent}>
        <div className="mb-3">
          <label className="form-label">Event Title</label>
          <input
            type="text"
            className="form-control"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>

      {eventSuccessMsg && <p className="mt-3">{eventSuccessMsg}</p>}
    </div>
  );
}
