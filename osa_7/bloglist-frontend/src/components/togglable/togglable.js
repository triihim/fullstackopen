import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { "display": visible ? "none" : "" };
  const showWhenVisible = { "display": visible ? "" : "none", marginTop: "10px" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div style={{ margin: "10px 0 20px 0" }}>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <Button variant="contained" color="primary" style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      <Button variant="contained" color="secondary" style={showWhenVisible} onClick={toggleVisibility}>Close</Button>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = "Togglable";

export default Togglable;