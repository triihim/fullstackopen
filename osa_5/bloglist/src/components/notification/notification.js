import React from "react";
import PropTypes from "prop-types";

export const NotificationType = Object.freeze({
  ERROR: 1,
  SUCCESS: 2
});

export const Notification = ({ content }) => {
  const type = content.type;
  const message = content.message;
  const isShown = content.isShown;
  const style = {
    display: isShown ? "block" : "none",
    border: "1px solid",
    borderColor: type === NotificationType.ERROR ? "red" : "green",
    color: type === NotificationType.ERROR ? "red" : "green",
    margin: "5px",
    padding: "5px 10px"
  };
  return (
    <div style={style} className="notification">
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  content: PropTypes.exact({
    type: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    isShown: PropTypes.bool.isRequired
  })
};
