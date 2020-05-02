// React
import React from "react";
import PropTypes from 'prop-types';

// Components
import Icon from "../../../components/Icon/Icon";

const TourCardOverview = (props) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          {props.cover}
        </div>
        <h3 className="card__heading">
          <span>{props.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{props.duration}</h4>
        <p className="card__text">{props.description}</p>
        <div className="card__data">
          <Icon type="map-pin" className="card__icon" />
          <span>{props.location}</span>
        </div>
        <div className="card__data">
          <Icon type="calendar" className="card__icon" />
          <span>{props.date}</span>
        </div>
        <div className="card__data">
          <Icon type="flag" className="card__icon" />
          <span>{props.stops}</span>
        </div>
        <div className="card__data">
          <Icon type="user" className="card__icon" />
          <span>{props.participants}</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">{`$${props.price}`}</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{props.ratingValue}</span>
          <span className="card__footer-text">{` rating (${props.ratingCount})`}</span>
        </p>
        {/* TODO: Click to redirect to /tour/tour-name */}
        <button className="btn btn--green btn--small">Details</button>
      </div>
    </div>
  );
};

TourCardOverview.propTypes = {
  cover: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.string.isRequired,
  participants: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  ratingValue: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
}

export default TourCardOverview;
