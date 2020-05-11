// React
import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  createBookingCheckout,
  getCurrentUserBookings,
} from "../../../../store/actions/bookingActions";

// Utilities
import queryString from "query-string";

// Components
import Spinner from "../../../../components/Spinner/Spinner";
import TourCard from "../../../../components/Cards/TourCard";

class Bookings extends Component {
  async componentDidMount() {
    if (this.props.location.search) {
      const search = queryString.parse(this.props.location.search);

      if (search.tour && search.user && search.price) {
        const bookingData = {
          tour: search.tour,
          user: search.user,
          price: search.price,
          date: search.date,
        };

        await this.props.createBookingCheckout(bookingData);

        this.props.history.push("/account/bookings");
      }
    } else if (!this.props.location.search) {
      // Get bookings
      this.props.getCurrentUserBookings(this.props.auth.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search &&
      !this.props.location.search
    ) {
      // Get bookings after redirect from creating the booking
      this.props.getCurrentUserBookings(this.props.auth.user.id);
    }
  }

  render() {
    console.log(this.props.bookings.userBookings);
    const { userBookings, loading } = this.props.bookings;

    let cards;
    let content = <div></div>;

    if (loading) {
      content = (
        <div>
          <Spinner />
        </div>
      );
    } else if (!loading && userBookings) {
      cards = userBookings.map((booking) => {
        const startDate = new Date(booking.tour.startDates[0]);
        return (
          <TourCard
            key={booking.tour.slug}
            imageURL={require(`../../../../assets/images/tours/${booking.tour.imageCover}`)}
            name={booking.tour.name}
            duration={`${booking.tour.difficulty} ${booking.tour.duration} day tour`}
            summary={booking.tour.summary}
            startLocation={booking.tour.startLocation.description}
            date={`${startDate.getMonth()}, ${startDate.getFullYear()}`}
            stops={`${booking.tour.locations.length} stops`}
            participants={`${booking.tour.maxGroupSize} people`}
            price={booking.tour.price}
            ratingsAverage={booking.tour.ratingsAverage}
            ratingsQuantity={booking.tour.ratingsQuantity}
            slug={booking.tour.slug}
          />
        );
      });
      content = <div className="card-grid">{cards}</div>;
    }

    return content;
  }
}

Bookings.propTypes = {
  bookings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bookings: state.bookings,
});

export default connect(mapStateToProps, {
  createBookingCheckout,
  getCurrentUserBookings,
})(withRouter(Bookings));
