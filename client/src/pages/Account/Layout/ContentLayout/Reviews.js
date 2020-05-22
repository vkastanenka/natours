// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getUserReviews } from "../../../../store/actions/reviewActions";

// Components
import Spinner from "../../../../components/Spinner/Spinner";
import ReviewCard from "../../../../components/Cards/ReviewCard";

// User reviews section to edit
class Reviews extends Component {
  componentDidMount() {
    this.props.getUserReviews();
  }

  render() {
    let content;
    let reviews;
    const { loading, userReviews } = this.props.reviews;

    if (loading || !userReviews) content = <Spinner />;
    else {
      reviews = userReviews.map((review) => {
        return (
          <ReviewCard
            key={review._id}
            cardClassName='reviews__card--border reviews__card--wider'
            imageURL={require(`../../../../assets/images/users/${review.user.photo}`)}
            name={review.user.name}
            tourName={review.tour.name}
            review={review.review}
            rating={review.rating}
            page='settings'
            reviewId={review._id}
            tourId={review.tour._id}
          />
        );
      });

      content = (
        <div className="review-grid">{reviews}</div>
      );
    }
    return content;
  }
}

Reviews.propTypes = {
  reviews: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps, { getUserReviews })(Reviews);
