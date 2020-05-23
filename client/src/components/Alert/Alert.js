// React
import React from "react";
import PropTypes from "prop-types";

// Alert that appears at the type of the page
const Alert = (props) => {
  return (
    <div className={`alert alert--${props.type}`}>
      {props.message}
      {props.prompt ? (
        <div className="alert__prompt">
          <span
            className="alert__prompt-function"
            onClick={() => {
              props.function()
              props.alertClose();
            }}
          >
            Yes
          </span>
          <span>||</span>
          <span className="alert__prompt-function" onClick={props.alertClose}>
            No
          </span>
        </div>
      ) : null}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  prompt: PropTypes.bool,
  alertClose: PropTypes.func,
  function: PropTypes.func,
};

export default Alert;
