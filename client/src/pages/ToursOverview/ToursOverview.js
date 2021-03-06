// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getTours } from "../../store/actions/tourActions";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import TourCard from "../../components/Cards/TourCard";
import Spinner from "../../components/Spinner/Spinner";

// All tours page showing cards with links to every tour
class ToursOverview extends Component {
  // If tours not in state, get the tours
  componentDidMount() {
    if (!this.props.tours.tours) {
      this.props.getTours();
    }
  }

  render() {
    const { tours, loading } = this.props.tours;
    let cards;
    let pageContent = <Spinner />;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (tours && !loading) {
      cards = tours.map((tour) => {
        const startDate = new Date(tour.startDates[0]);
        return (
          <TourCard
            key={tour.slug}
            imageURL={require(`../../assets/images/tours/${tour.imageCover}`)}
            name={tour.name}
            duration={`${tour.difficulty} ${tour.duration} day tour`}
            summary={tour.summary}
            startLocation={tour.startLocation.description}
            date={`${months[startDate.getMonth()]}, ${startDate.getFullYear()}`}
            stops={`${tour.locations.length} stops`}
            participants={`${tour.maxGroupSize} people`}
            price={tour.price}
            ratingsAverage={tour.ratingsAverage}
            ratingsQuantity={tour.ratingsQuantity}
            slug={tour.slug}
          />
        );
      });

      pageContent = <div className="card-grid">{cards}</div>;
    }

    return (
      <PageLayout>
        <main className="main">{pageContent}</main>
      </PageLayout>
    );
  }
}

ToursOverview.propTypes = {
  tours: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tours: state.tours,
});

export default connect(mapStateToProps, { getTours })(ToursOverview);
