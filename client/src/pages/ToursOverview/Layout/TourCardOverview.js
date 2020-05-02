// React
import React from "react";

// Components
import Icon from "../../../components/Icon/Icon";

const TourCardOverview = () => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">
            &nbsp;
          </div>
          <img
              src={require("../../../assets/images/tours/tour-1-cover.jpg")}
              alt="Tour 1"
              className="card__picture-img"
            />
        </div>
        <h3 className="card__heading">
          <span>The Forest Hiker</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">Easy 5 day tour</h4>
        <p className="card__text">
          Breathtaking hike through the Canadian Banff National Park
        </p>
        <div className="card__data">
          <Icon type="map-pin" className="card__icon" />
          <span>Banff, Canada</span>
        </div>
        <div className="card__data">
          <Icon type="calendar" className="card__icon" />
          <span>April, 2021</span>
        </div>
        <div className="card__data">
          <Icon type="flag" className="card__icon" />
          <span>3 stops</span>
        </div>
        <div className="card__data">
          <Icon type="user" className="card__icon" />
          <span>25 people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">$297</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">4.9</span>
          <span className="card__footer-text"> rating (21)</span>
        </p>
        <button className="btn btn--green btn--small">Details</button>
      </div>
    </div>
  );
};

export default TourCardOverview;
