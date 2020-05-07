// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

const ReviewCard = (props) => {
  let ratingStars = [];

  for (let i = 0; i < props.rating; i++) {
    ratingStars.push(
      <Icon
        type="star"
        key={ratingStars.length}
        className="reviews__star reviews__star--active"
      />
    );
  }

  while (ratingStars.length < 5) {
    ratingStars.push(
      <Icon
        type="star"
        key={ratingStars.length}
        className="reviews__star reviews__star--inactive"
      />
    );
  }

  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={props.imageURL}
          alt="Jim Brown"
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{props.name}</h6>
      </div>
      <p className="reviews__text">{props.review}</p>
      <div className="reviews__rating">{ratingStars}</div>
    </div>
  );
};

ReviewCard.propTypes = {
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ReviewCard;
