import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
  return <div className={`alert alert--${props.type}`}>{props.message}</div>;
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Alert;
