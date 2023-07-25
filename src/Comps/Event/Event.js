import React from "react";
import moment from "moment";
import "./../../Resources/CSS/Event.css";

const Event = ({ event }) => {
  return (
    <li className="event-item" key={event.id}>
      <div className="event-date">
        {moment(event.date).format("MMMM Do, YYYY")}
      </div>
      <div className="event-name">{event.title}</div>
      <div className="event-image"> </div>
      <div className="event-location">{event.location}</div>
    </li>
  );
};

export default Event;
