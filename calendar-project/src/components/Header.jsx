import React from "react";
import styles from "../styles/Header.module.css";

const Header = ({ month, year, onPrevMonth, onNextMonth }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.header}>
      <button onClick={onPrevMonth}>&lt;</button>
      <h2>{`${monthNames[month]} ${year}`}</h2>
      <button onClick={onNextMonth}>&gt;</button>
    </div>
  );
};

export default Header;
