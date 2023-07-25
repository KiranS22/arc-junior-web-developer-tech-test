import React from "react";
import moment from "moment";
import "./../../Resources/CSS/Event.css";

const Event = ({ event }) => {
  return (
    <div className="event-item">
      <div className="event-date">
        {moment(event.date).format("MMMM Do, YYYY")}
      </div>
      <div className="event-name">{event.title}</div>
      <div className="event-image-container">
        <img src={event.images.desktop} alt={event.title} />
      </div>
      <div className="event-location">{event.location}</div>
    </div>
  );
};

export default Event;
