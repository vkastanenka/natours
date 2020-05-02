// React
import React from "react";
import PropTypes from "prop-types";

const ErrorPage = (props) => {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            {props.heading}
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
          <div className="error__msg">{props.message}</div>
        </div>
      </div>
    </main>
  );
};

ErrorPage.propTypes = {
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
