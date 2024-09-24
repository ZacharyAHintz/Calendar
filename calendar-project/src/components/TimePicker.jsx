import React, { useState } from "react";
import styles from "../styles/TimePicker.module.css";

const TimePicker = ({ onSubmit, onClose }) => {
  const [hour, setHour] = useState("1");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    if (!eventName) {
      alert("Please enter an event name");
      return;
    }
    onSubmit({ eventName, time: `${hour}:${minute} ${period}` });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Select Time</h2>
        <div className={styles.selectContainer}>
          <label>
            Hour:
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Minute:
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((min) => (
                <option key={min} value={min < 10 ? `0${min}` : min}>
                  {min < 10 ? `0${min}` : min}
                </option>
              ))}
            </select>
          </label>
          <label>
            Period:
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </label>
        </div>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
        </label>
        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit}>Add Event</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
