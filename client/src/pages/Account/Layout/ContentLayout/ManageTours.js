// React
import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getTours } from "../../../../store/actions/tourActions";
import { deleteTour } from "../../../../store/actions/tourActions";

// Components
import Popup from "../../../../components/HigherOrder/Popup";
import Spinner from "../../../../components/Spinner/Spinner";
import TourCard from "../../../../components/Cards/TourCard";
import TourForm from "../../../../components/Forms/Tour";
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";

// Page to add and delete tours
class ManageTours extends Component {
  state = {
    addingTour: false,
  };

  componentDidMount() {
    const { tours } = this.props.tours;
    const { role } = this.props.auth.user;
    // If role is not admin or lead-guide, push them to their settings page
    if (role === "user" || role === "guide") {
      this.props.history.push("/account/settings");
    } else if (
      (role === "admin" && !tours) ||
      (role === "lead-guide" && !tours)
    ) {
       // Add users to global state
      if (!tours) {
        this.props.getTours();
      }
    }
  }

  render() {
    const { tours, loading } = this.props.tours;
    let alert;
    let cards;
    let popup;
    let pageContent = <Spinner />;

    if (this.state.addingTour) {
      popup = (
        <Popup>
          <TourForm popupClose={() => this.setState({ addingTour: false })} />
        </Popup>
      );
    }

    if (tours && !loading) {
      cards = tours.map((tour) => {
        const startDate = new Date(tour.startDates[0]);
        return (
          <TourCard
            key={tour.slug}
            imageURL={require(`../../../../assets/images/tours/${tour.imageCover}`)}
            name={tour.name}
            duration={`${tour.difficulty} ${tour.duration} day tour`}
            summary={tour.summary}
            startLocation={tour.startLocation.description}
            date={`${startDate.getMonth()}, ${startDate.getFullYear()}`}
            stops={`${tour.locations.length} stops`}
            participants={`${tour.maxGroupSize} people`}
            price={tour.price}
            ratingsAverage={tour.ratingsAverage}
            ratingsQuantity={tour.ratingsQuantity}
            slug={tour.slug}
            page="manageTours"
            tourId={tour._id}
            tour={tour}
            deleteTour={() => this.props.deleteTour(tour._id)}
          />
        );
      });

      pageContent = (
        <Auxiliary>
          {alert}
          {popup}
          <button
            className="btn-text user-view__link user-view__link--top-right"
            onClick={() => this.setState({ addingTour: true })}
          >
            Add Tour
          </button>
          <div className="bookings-grid">{cards}</div>
        </Auxiliary>
      );
    }

    return pageContent;
  }
}

ManageTours.propTypes = {
  auth: PropTypes.object.isRequired,
  tours: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  tours: state.tours,
});

export default connect(mapStateToProps, { getTours, deleteTour })(
  withRouter(ManageTours)
);
