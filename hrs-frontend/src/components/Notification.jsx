import React, { useEffect } from "react";
import "../assets/css/Notification.css";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Call the parent's function to clear the notification
      }, 3000);

      // Cleanup the timer when the component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null; // Don't render if there's no message

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
