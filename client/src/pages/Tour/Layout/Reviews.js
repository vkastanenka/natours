// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Auxiliary from "../../../components/HigherOrder/Auxiliary";
import ReviewCard from "../../../components/Cards/ReviewCard";
import Popup from "../../../components/HigherOrder/Popup";
import ReviewForm from "../../../components/Forms/Review";

// Reviews section of the tour page
class Reviews extends Component {
  state = {
    writingReview: false,
  };

  render() {
    let popup = null;
    const reviews = this.props.reviews.map((review) => {
      return (
        <ReviewCard
          key={review._id}
          imageURL={require(`../../../assets/images/users/${review.user.photo}`)}
          name={review.user.name}
          review={review.review}
          rating={review.rating}
        />
      );
    });

    if (this.state.writingReview) {
      popup = (
        <Popup>
          <ReviewForm popupClose={() => this.setState({ writingReview: false })} />
        </Popup>
      );
    }

    return (
      <Auxiliary>
        {popup}
        <section className="section-reviews">
          <div className="reviews ma-bt-lg">{reviews}</div>
          <button
            type="submit"
            className="btn btn--white section-reviews__btn"
            onClick={() => this.setState({ writingReview: true })}
          >
            Write a Review
          </button>
        </section>
      </Auxiliary>
    );
  }
}

Reviews.propTypes = {
  auth: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Reviews);
