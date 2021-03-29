import React from "react";
import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export const Notification = () => {
  const notification = useSelector(state => state.notification);
  const severity = notification.type === "SUCCESS" ? "success" : "error";

  return (
    <Snackbar open={notification.visible} style={{ display: notification.visible ? "block" : "none" }}>
      <MuiAlert severity={severity}>
        {notification.message}
      </MuiAlert>
    </Snackbar>
  );
};