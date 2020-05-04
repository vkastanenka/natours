// React
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__imgs">
          <div className="cta__img cta__img--logo">
            <img
              src={require("../../../assets/images/logo-white.png")}
              alt="Natours Logo"
            />
          </div>
          <img
            src={require("../../../assets/images/tours/tour-5-2.jpg")}
            alt=""
            className="cta__img cta__img--1"
          />
          <img
            src={require("../../../assets/images/tours/tour-5-1.jpg")}
            alt=""
            className="cta__img cta__img--2"
          />
        </div>
        <div className="cta__content">
          <h2 className="heading-secondary"> What are you waiting for?</h2>
          <p className="cta__text">
            10 days. 1 adventure. Infinite memories. Make it yours today!
          </p>
          <button className="btn btn--green span-all-rows">
            Login to Book Tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
