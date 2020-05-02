// React
import React from "react";

// Components
import Icon from "../../../components/Icon/Icon";

const Header = () => {
  return (
    <section className="section-header-tour">
      <div className="header-tour__hero">
        <div className="header-tour__hero-overlay">
          &nbsp;
          <img
            src={require("../../../assets/images/tours/tour-5-cover.jpg")}
            alt="Tour 5"
            className="header-tour__hero-img"
          />
        </div>
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>The Park Camper Tour</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <Icon type="clock" className="heading-box__icon" />
            <span className="heading-box__text">10 days</span>
          </div>
          <div className="heading-box__detail">
            <Icon className="heading-box__icon" type="map-pin" />
            <span className="heading-box__text">Las Vegas, USA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
