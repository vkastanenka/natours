// React
import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { createBookingCheckout } from "../../../../store/actions/bookingActions";

// Utilities
import queryString from "query-string";

// Components
import Spinner from "../../../../components/Spinner/Spinner";

class Bookings extends Component {
  async componentDidMount() {
    if (this.props.location.search) {
      const search = queryString.parse(this.props.location.search);

      if (search.tour && search.user && search.price) {
        const bookingData = {
          tour: search.tour,
          user: search.user,
          price: search.price,
          date: search.date
        };

        await this.props.createBookingCheckout(bookingData);

        this.props.history.push('/account/bookings');
      }
    }
    // else if (!this.props.location.search) {
    // }
    // // Get bookings
  }

  render() {
    let content;

    if (this.props.bookings.loading) {
      content = <Spinner />;
    }

    return <div>{content}</div>;
  }
}

Bookings.propTypes = {
  bookings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bookings: state.bookings,
});

export default connect(mapStateToProps, { createBookingCheckout })(
  withRouter(Bookings)
);
