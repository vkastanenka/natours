// React
import React from "react";
import PropTypes from "prop-types";

// Components
import ReviewCard from "../../../components/Cards/ReviewCard";

const Reviews = (props) => {
  const reviews = props.reviews.map((review) => {
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

  return (
    <section className="section-reviews">
      <div className="reviews">{reviews}</div>
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default Reviews;
