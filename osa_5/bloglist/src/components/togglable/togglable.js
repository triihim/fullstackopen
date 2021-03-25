import React, {useState, useImperativeHandle} from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { "display": visible ? "none" : "" };
  const showWhenVisible = { "display": visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>Cancel</button>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable;