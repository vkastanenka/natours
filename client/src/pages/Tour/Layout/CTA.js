// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { createCheckoutSession } from "../../../store/actions/bookingActions";

// Components
import Alert from "../../../components/Alert/Alert";
import Auxiliary from "../../../components/HigherOrder/Auxiliary";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Call to action section where user can create a booking session
class CTA extends Component {
  state = {
    errorMessage: "",
  };

  // Binding timer to component instance
  timer = null;

  // Clear any timers / alerts when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.setState({ errorMessage: "" });
  }

  // Once checkout session data in state, redirect to checkout
  async componentWillReceiveProps(nextProps) {
    if (
      !this.props.bookings.checkoutSession &&
      nextProps.bookings.checkoutSession
    ) {
      const sessionId = nextProps.bookings.checkoutSession.id;
      // 2. When customer clicks on the button, redirect them to checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    }
  }

  onCreateCheckoutSession = async (e) => {
    e.preventDefault();
    await this.props.createCheckoutSession(this.props.tours.tour.id);
  };

  render() {
    let button = (
      <button className="btn btn--green span-all-rows">
        <Link to="/authenticate/login" className="link-style">
          Login to Book Tour
        </Link>
      </button>
    );

    if (this.props.auth.authenticated) {
      button = (
        <button
          className="btn btn--green span-all-rows"
          onClick={this.onCreateCheckoutSession}
        >
          Book the Tour Now!
        </button>
      );
    }

    return (
      <Auxiliary>
        {this.state.errorMessage ? (
          <Alert type="error" message={this.state.errorMessage} />
        ) : null}
        <section className="section-cta">
          <div className="cta">
            <div className="cta__imgs">
              <div className="cta__img cta__img--logo">
                {/* eslint-disable-next-line */}
                <img
                  src={require("../../../assets/images/logo-white.png")}
                  alt="Natours Logo"
                />
              </div>
              {/* eslint-disable-next-line */}
              <img
                src={require(`../../../assets/images/tours/${this.props.images[1]}`)}
                alt="Tour Image 1"
                className="cta__img cta__img--1"
              />
              {/* eslint-disable-next-line */}
              <img
                src={require(`../../../assets/images/tours/${this.props.images[0]}`)}
                alt="Tour Image 2"
                className="cta__img cta__img--2"
              />
            </div>
            <div className="cta__content">
              <h2 className="heading-secondary"> What are you waiting for?</h2>
              <p className="cta__text">
                {`${this.props.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
              </p>
              {button}
            </div>
          </div>
        </section>
      </Auxiliary>
    );
  }
}

CTA.propTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  tours: PropTypes.object.isRequired,
  bookings: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tours: state.tours,
  bookings: state.bookings,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCheckoutSession })(CTA);
