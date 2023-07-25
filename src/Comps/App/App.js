import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../../Resources/CSS/App.css";
import Event from "../Event/Event";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (Date.now() < tokenExpiration) {
        fetchEvents(selectedMonth, storedToken);
      } else {
        getTokenAndFetchEvents(selectedMonth);
      }
    } else {
      getTokenAndFetchEvents(selectedMonth);
    }
  }, [selectedMonth]);

  const storeToken = (jwtToken) => {
    const tokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("tokenExpiration", tokenExpiration);
  };

  const getTokenAndFetchEvents = async (month) => {
    console.log("URL ", `${process.env.REACT_APP_BASE_URL}/auth`);
    try {
      const tokenResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
        }
      );

      const jwtToken = tokenResponse.data;
      storeToken(jwtToken);
      await fetchEvents(month, jwtToken);
    } catch (error) {
      console.error("Error getting JWT token:", error.message);
    }
  };

  const fetchEvents = async (month, jwtToken) => {
    try {
      const monthNumber = moment(month).format("M");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/event/month/1318/${monthNumber}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className="App">
      <h1>Upcoming Events</h1>
      <div className="calendar-container">
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
      </div>
      <ul>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}

export default App;
