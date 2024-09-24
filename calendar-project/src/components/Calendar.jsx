import React, { useState } from "react";
import Event from "./Event";
import Header from "./Header";
import styles from "../styles/Calendar.module.css";

const Calendar = ({ events, addEvent, updateEvent, deleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const calendarDays = Array(firstDayOfMonth).fill(null).concat(days);
  const weeks = [];

  while (calendarDays.length) {
    weeks.push(calendarDays.splice(0, 7));
  }

  const handleAddEvent = (day) => {
    const title = prompt("Enter event title:");
    if (title) {
      const eventDate = new Date(year, month, day, 0, 0, 0)
        .toISOString()
        .split("T")[0];
      addEvent({ title, date: eventDate });
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.calendarContainer}>
      <Header
        month={month}
        year={year}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <div className={styles.calendar}>
        <div className={styles.weekHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index} className={styles.dayHeader}>
                {day}
              </div>
            )
          )}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.week}>
            {week.map((day, dayIndex) => {
              const dateToCheck = new Date(year, month, day)
                .toISOString()
                .split("T")[0];
              const eventForTheDay = events.filter(
                (event) => event.date === dateToCheck
              );

              return (
                <div
                  key={dayIndex}
                  className={styles.day}
                  style={{
                    backgroundColor:
                      today === dateToCheck ? "#d3f9d8" : "transparent",
                  }}
                >
                  <div className={styles.dayNumber}>{day}</div>
                  {eventForTheDay.map((event) => (
                    <Event
                      key={event.id}
                      event={event}
                      updateEvent={updateEvent}
                      deleteEvent={deleteEvent}
                    />
                  ))}
                  <button
                    className={styles.addEventButton}
                    onClick={() => handleAddEvent(day)}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
