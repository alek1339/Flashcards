import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Notification.scss";

const Notification = ({ message, duration, onClose }) => {
  const [showNotification, setShowNotification] = useState(true);
  console.log('message', message)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${showNotification ? "show" : ""}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  duration: 3000,
};

export default Notification;
