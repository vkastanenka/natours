import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
  return (
    <div className={`alert alert--${props.type}`}>
      {props.message}
      {props.prompt ? (
        <div className="alert__prompt">
          <span
            className="alert__prompt-function"
            onClick={() => props.function(props.reviewId)}
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
  reviewId: PropTypes.string,
  function: PropTypes.func,
  alertClose: PropTypes.func,
};

export default Alert;
