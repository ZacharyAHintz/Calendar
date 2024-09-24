import React, { useState } from "react";
import Event from "./Event";
import Header from "./Header";
import styles from "../styles/FullCalendar.module.css";
import TimePicker from "./TimePicker";

const FullCalendar = ({ events, addEvent, updateEvent, deleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

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
    setSelectedDay(day);
    setShowTimePicker(true);
  };

  const handleTimeSubmit = ({ eventName, time }) => {
    const [hour, minutePeriod] = time.split(":");
    const [minute, period] = minutePeriod.split(" ");
    const hourIn24 =
      period === "PM" && hour !== "12"
        ? parseInt(hour) + 12
        : period === "AM" && hour === "12"
        ? 0
        : hour;
    const eventDate = new Date(
      year,
      month,
      selectedDay,
      hourIn24,
      minute
    ).toISOString();
    addEvent({ title: eventName, date: eventDate });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.fullCalendarContainer}>
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
              const eventsForTheDay = events.filter((event) =>
                event.date.startsWith(dateToCheck)
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
                  {eventsForTheDay
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => (
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
      {showTimePicker && (
        <TimePicker
          onSubmit={handleTimeSubmit}
          onClose={() => setShowTimePicker(false)}
        />
      )}
    </div>
  );
};

export default FullCalendar;
