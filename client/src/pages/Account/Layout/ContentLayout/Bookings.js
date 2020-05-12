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
  deleteBooking,
} from "../../../../store/actions/bookingActions";

// Utilities
import queryString from "query-string";

// Components
import Alert from "../../../../components/Alert/Alert";
import Spinner from "../../../../components/Spinner/Spinner";
import TourCard from "../../../../components/Cards/TourCard";
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";

class Bookings extends Component {
  state = {
    deletingBooking: false,
    bookingToDelete: "",
  };

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
    if (prevProps.location.search && !this.props.location.search) {
      // Get bookings after redirect from creating the booking
      this.props.getCurrentUserBookings(this.props.auth.user.id);
    }
  }

  render() {
    const { userBookings, loading } = this.props.bookings;

    let cards;
    let alert;
    let content = <div></div>;

    if (this.state.deletingBooking) {
      alert = (
        <Alert
          type="error"
          message="Are you sure you want to cancel your tour?"
          prompt={true}
          deleteId={this.state.bookingToDelete}
          function={this.props.deleteBooking}
          alertClose={() =>
            this.setState({ deletingBooking: false, bookingToDelete: "" })
          }
        />
      );
    }

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
            iconClose={() =>
              this.setState({
                deletingBooking: true,
                bookingToDelete: booking._id,
              })
            }
          />
        );
      });
      content = (
        <Auxiliary>
          {alert}
          <div className="bookings-grid">{cards}</div>
        </Auxiliary>
      );
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
  deleteBooking,
})(withRouter(Bookings));
