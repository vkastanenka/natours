// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

const CTA = (props) => {
  let buttonContent = (
    <Link to="/authenticate/login" className="link-style">
      Login to Book Tour
    </Link>
  );

  if (props.auth.authenticated) {
    buttonContent = "Book the Tour Now!";
  }

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
            src={require(`../../../assets/images/tours/${props.images[1]}`)}
            alt="Tour Image 1"
            className="cta__img cta__img--1"
          />
          <img
            src={require(`../../../assets/images/tours/${props.images[0]}`)}
            alt="Tour Image 2"
            className="cta__img cta__img--2"
          />
        </div>
        <div className="cta__content">
          <h2 className="heading-secondary"> What are you waiting for?</h2>
          <p className="cta__text">
            {`${props.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
          </p>
          <button className="btn btn--green span-all-rows">
            {buttonContent}
          </button>
        </div>
      </div>
    </section>
  );
};

CTA.propTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CTA);
