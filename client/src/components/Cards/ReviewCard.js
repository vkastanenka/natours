// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { deleteReview } from "../../store/actions/reviewActions";
import { deleteCurrentUserReview } from "../../store/actions/reviewActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import ReviewForm from "../Forms/Review";
import Popup from "../../components/HigherOrder/Popup";
import Auxiliary from "../../components/HigherOrder/Auxiliary";

// Card containing a user review
class ReviewCard extends Component {
  state = {
    editingReview: false,
    deletingReview: false,
  };

  render() {
    let icons;
    let popup;
    let alert;
    let ratingStars = [];

    for (let i = 0; i < this.props.rating; i++) {
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

    if (this.props.page === "settings") {
      icons = (
        <div className="reviews__icons">
          <Icon
            type="edit"
            onClick={() => this.setState({ editingReview: true })}
            className="icon icon--large icon--active icon--black-primary icon--translate"
          />
          <Icon
            type="x"
            onClick={() => this.setState({ deletingReview: true })}
            className="icon icon--large icon--active icon--black-primary icon--translate"
          />
        </div>
      );
    } else if (this.props.page === "manageReviews") {
      icons = (
        <div className="reviews__icons">
          <Icon
            type="x"
            onClick={() => this.setState({ deletingReview: true })}
            className="icon icon--large icon--active icon--black-primary icon--translate"
          />
        </div>
      );
    }

    if (this.state.editingReview) {
      popup = (
        <Popup>
          <ReviewForm
            popupClose={() => this.setState({ editingReview: false })}
            editingReview={true}
            tourName={this.props.tourName}
            review={this.props.review}
            rating={this.props.rating}
            reviewId={this.props.reviewId}
            tourId={this.props.tourId}
          />
        </Popup>
      );
    }

    if (this.state.deletingReview) {
      alert = (
        <Alert
          type="error"
          message="Are you sure you want to delete this review?"
          prompt={true}
          function={
            this.props.page === "manageReviews"
              ? () => this.props.deleteReview(this.props.reviewId)
              : () => this.props.deleteCurrentUserReview(this.props.reviewId)
          }
          alertClose={() => this.setState({ deletingReview: false })}
        />
      );
    }

    return (
      <Auxiliary>
        {popup}
        {alert}
        <div className={`reviews__card ${this.props.cardClassName}`}>
          {icons}
          <div className="reviews__avatar">
            <img
              src={this.props.imageURL}
              alt={this.props.name}
              className="reviews__avatar-img"
            />
            <h6 className="reviews__user">{this.props.name}</h6>
          </div>
          {this.props.tourName ? (
            <h3 className="heading-secondary heading-secondary--smaller ma-bt-sm">
              {this.props.tourName}
            </h3>
          ) : null}
          <p className="reviews__text">{this.props.review}</p>
          <div className="reviews__rating">{ratingStars}</div>
        </div>
      </Auxiliary>
    );
  }
}

ReviewCard.propTypes = {
  page: PropTypes.string,
  reviewId: PropTypes.string,
  tourId: PropTypes.string,
  cardClassName: PropTypes.string,
  tourName: PropTypes.string,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default connect(null, { deleteReview, deleteCurrentUserReview })(
  ReviewCard
);
