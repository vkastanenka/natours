// React
import React from "react";
import PropTypes from 'prop-types';

// Components
import Icon from "../../../components/Icon/Icon";

const Header = props => {
  return (
    <section className="section-header-tour">
      <div className="header-tour__hero">
        <div className="header-tour__hero-overlay">&nbsp;</div>
        <img
          src={props.imageURL}
          alt={`${props.name} Tour Cover`}
          className="header-tour__hero-img"
        />
      </div>
      <div className="heading-box">
        <h1 className="header-tour__heading">
          <span>{`${props.name} Tour`}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <Icon type="clock" className="heading-box__icon" />
            <span className="heading-box__text">{`${props.duration} days`}</span>
          </div>
          <div className="heading-box__detail">
            <Icon className="heading-box__icon" type="map-pin" />
            <span className="heading-box__text">{props.startLocation}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

Header.propTypes = {
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  startLocation: PropTypes.string.isRequired,
}

export default Header;
