// React
import React, { Component } from "react";
import { PropTypes } from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getTour } from "../../store/actions/tourActions";

// Components
import Spinner from "../../components/Spinner/Spinner";
import PageLayout from "../../components/Layout/PageLayout";
import Header from "./Layout/Header";
import Description from "./Layout/Description";
import Pictures from "./Layout/Pictures";
import Map from "./Layout/Map";
import Reviews from "./Layout/Reviews";
import CTA from "./Layout/CTA";

class Tour extends Component {
  componentDidMount() {
    this.props.getTour(this.props.match.params.slug);
  }

  render() {
    const { tour, loading } = this.props.tours;
    let pageContent = <Spinner />;

    
    if (tour && !loading) {
      pageContent = (
        <main>
          <Header
            imageURL={require(`../../assets/images/tours/${tour.imageCover}`)}
            name={tour.name}
            duration={tour.duration}
            startLocation={tour.startLocation.description}
          />
          <Description
            nextDate={new Date(tour.startDates[0])}
            difficulty={tour.difficulty}
            maxGroupSize={tour.maxGroupSize}
            ratingsAverage={tour.ratingsAverage}
            guides={tour.guides}
            name={tour.name}
            description={tour.description.split(/\r?\n/)}
          />
          <Pictures images={tour.images} />
          <Map locations={tour.locations} />
          <Reviews reviews={tour.reviews} />
          <CTA images={tour.images} duration={tour.duration} />
        </main>
      );
    }

    return <PageLayout>{pageContent}</PageLayout>;
  }
}

Tour.propTypes = {
  tours: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tours: state.tours,
});

export default connect(mapStateToProps, { getTour })(Tour);
