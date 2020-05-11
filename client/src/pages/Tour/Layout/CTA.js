// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Utilities
import axios from "axios";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CTA = (props) => {
  const handleBooking = async (e) => {
    e.preventDefault();

    // 1. Obtain session id
    const res = await axios.get(
      `/api/v1/bookings/checkout-session/${props.tours.tour.id}`
    );
    const sessionId = res.data.session.id;

    // 2. When customer clicks on the button, redirect them to checkout
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    // 3. If redirectToCheckout fails due to a browser or network error, display the localized error message to customer using error.message
  };

  let button = (
    <button className="btn btn--green span-all-rows">
      <Link to="/authenticate/login" className="link-style">
        Login to Book Tour
      </Link>
    </button>
  );

  if (props.auth.authenticated) {
    button = (
      <button className="btn btn--green span-all-rows" onClick={handleBooking}>
        Book the Tour Now!
      </button>
    );
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
          {button}
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
  tours: state.tours,
  bookings: state.bookings,
});

export default connect(mapStateToProps)(CTA);
