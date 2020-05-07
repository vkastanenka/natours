// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

const TourCard = (props) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={props.imageURL}
            alt={`${props.name} cover`}
            className="card__picture-img"
          />
        </div>
        <h3 className="card__heading">
          <span>{props.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{props.duration}</h4>
        <p className="card__text">{props.summary}</p>
        <div className="card__data">
          <Icon type="map-pin" className="card__icon" />
          <span>{props.startLocation}</span>
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
          <span className="card__footer-value">{props.ratingsAverage}</span>
          <span className="card__footer-text">{` rating (${props.ratingsQuantity})`}</span>
        </p>
        <button className="btn btn--green btn--small">
          <Link to={`/tour/${props.slug}`} className="link-style">
            Details
          </Link>
        </button>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  startLocation: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.string.isRequired,
  participants: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ratingsAverage: PropTypes.number.isRequired,
  ratingsQuantity: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TourCard;
