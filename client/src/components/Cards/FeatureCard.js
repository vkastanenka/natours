// React
import React from "react";
import PropTypes from "prop-types";

// Styling
import "../../assets/css/icon-font.css";

// Feature card for home page
const FeatureCard = (props) => {
  return (
    <div className="feature-box">
      <i className={`feature-box__icon icon-basic-${props.icon}`}></i>
      <h3 className="heading-tertiary u-margin-bottom-small">
        {props.heading}
      </h3>
      <p className="feature-box__text">{props.description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
