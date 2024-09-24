import React from "react";
import styles from "../styles/Event.module.css";

const Event = ({ event, updateEvent, deleteEvent }) => {
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.event}>
      <span>
        {event.title} at {formattedTime}
      </span>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() =>
            updateEvent({
              ...event,
              title: prompt("Update event title:", event.title) || event.title,
            })
          }
        >
          Edit
        </button>
        <button className={styles.button} onClick={() => deleteEvent(event.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Event;
