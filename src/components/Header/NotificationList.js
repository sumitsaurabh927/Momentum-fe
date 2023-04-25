import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./header.css";

const NotificationList = ({ notification, theme }) => {
  const [newNotification, setNewNotification] = useState(true);

  const { message, title, description } = notification.payload;

  // Check if the notification has been read and update state accordingly
  useEffect(() => {
    if (notification.read) {
      setNewNotification(false);
    }
  }, [notification.read, setNewNotification]);

  if (message === "created" || message === "deleted") {
    return (
      <div
        className="notification_container"
        style={{
          borderLeft: newNotification ? "5px solid red" : "none",
          boxShadow: theme
            ? "0px 5px 10px rgba(236, 109, 109, 0.4)"
            : "0px 5px 10px rgba(0.1,0.5,0.5,0.1)",
        }}
      >
        <span style={{ color: theme ? "#fff" : "#000" }}>
          {`${message} Todo`}
        </span>
        <h3 style={{ color: theme ? "#fff" : "#000" }}>{title}</h3>
        <p style={{ color: theme ? "#fff" : "#000" }}>{description}</p>
      </div>
    );
  }

  // If the message type is not recognized, return null
  return null;
};

export default NotificationList;
