import React, { useState, useEffect } from "react";
import FullCalendar from "./components/FullCalendar";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState("light");
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
      setNextId(
        storedEvents.length > 0
          ? Math.max(...storedEvents.map((event) => event.id)) + 1
          : 1
      );
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light if no theme is saved
    setTheme(savedTheme);
    document.body.className = savedTheme; // Apply saved theme on load
  }, []);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: nextId }]);
    setNextId(nextId + 1);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    localStorage.setItem(
      "events",
      JSON.stringify(events.filter((event) => event.id !== id))
    );
  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  return (
    <div className={theme} style={{ height: "100vh", width: "100vw" }}>
      <ThemeToggle toggleTheme={toggleTheme} />
      <FullCalendar
        events={events}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default App;
