import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    display: notification.visible ? "block" : "none",
    border: "1px solid",
    borderColor: notification.type === "ERROR" ? "red" : "green",
    color: notification.type === "ERROR" ? "red" : "green",
    margin: "5px",
    padding: "5px 10px"
  };

  return (
    <div style={style} className="notification">
      <p>{notification.message}</p>
    </div>
  );
};