// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { postReview } from "../../store/actions/reviewActions";
import { updateUserReview } from "../../store/actions/reviewActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import Auxiliary from "../HigherOrder/Auxiliary";
import TextAreaGroup from "../Inputs/TextAreaGroup";

// Review form to post/patch review documents
class Review extends Component {
  state = {
    review: "",
    rating: 5,
    tour: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
  };

  componentDidMount() {
    if (this.props.editingReview) {
      this.setState({
        review: this.props.review,
        rating: this.props.rating,
        tour: this.props.tourId,
      });
    }
  }

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    // Let user know request is happening / finished
    if (nextProps.reviews.loading) {
      this.setState({
        submitting: true,
        disableSubmitButton: true,
      });
      // If request finishes and errors
    } else if (
      !nextProps.reviews.loading &&
      Object.keys(nextProps.errors).length > 0
    ) {
      this.setState({
        submitting: false,
        disableSubmitButton: false,
      });

      // Clear errors after 6 seconds
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request for a new review
  onReviewSubmit = async (e) => {
    e.preventDefault();
    let reviewData;

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // 1. State to change button text
    this.setState({
      submitting: true,
      disableSubmitButton: true,
    });

    if (this.state.submitted) {
      this.setState({ submitted: false });
    }

    // 2. Review data to post
    if (!this.props.editingReview) {
      reviewData = {
        review: this.state.review,
        rating: this.state.rating,
        tour: this.props.tours.tour.id,
      };
    } else if (this.props.editingReview) {
      reviewData = {
        review: this.state.review,
        rating: this.state.rating,
        tour: this.state.tour,
      };
    }

    // 3. Post / patch review
    if (!this.props.editingReview) {
      await this.props.postReview(reviewData);

      if (Object.keys(this.props.errors).length === 0) {
        this.setState({
          review: "",
          submitted: true,
          submitting: false,
          disableSubmitButton: false,
        });
      }
    } else {
      await this.props.updateUserReview(this.props.reviewId, reviewData);
    }
  };

  render() {
    const errors = [];
    let buttonText = "Submit review";

    if (this.props.errors) {
      for (let err in this.props.errors) {
        errors.push(<p key={err}>{this.props.errors[err]}</p>);
      }
    }

    if (this.props.editingReview) {
      buttonText = "Update review";
    } else if (this.props.editingReview && this.state.submitting) {
      buttonText = "Updating review...";
    } else if (this.state.submitting) {
      buttonText = "Submitting review...";
    }

    return (
      <Auxiliary>
        {Object.keys(this.props.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        {this.state.submitted ? (
          <Alert type="success" message="Submitted review!" />
        ) : null}
        <form className="form authenticate-form" onSubmit={this.onReviewSubmit}>
          <Icon
            type="x"
            className="icon icon--large icon--black-primary icon--translate icon--active form__close-icon"
            onClick={this.props.popupClose}
          />
          <h2 className="heading-secondary heading-secondary--small">
            {this.props.editingReview
              ? "Edit your review for"
              : "Submit a review for"}
          </h2>
          <br />
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            {this.props.editingReview
              ? `${this.props.tourName} Tour`
              : `${this.props.tours.tour.name} Tour`}
          </h2>
          <TextAreaGroup
            name="review"
            id="review"
            inputClass="form__textarea"
            placeholder="Write your review here"
            value={this.state.review}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="review"
            label="Review"
          />
          <div className="form__group">
            <Icon
              type="star"
              className="reviews__star reviews__star--active icon--active"
              onClick={() => this.setState({ rating: 1 })}
            />
            <Icon
              type="star"
              className={
                this.state.rating >= 2
                  ? "reviews__star reviews__star--active icon--active"
                  : "reviews__star reviews__star--inactive icon--active"
              }
              onClick={() => this.setState({ rating: 2 })}
            />
            <Icon
              type="star"
              className={
                this.state.rating >= 3
                  ? "reviews__star reviews__star--active icon--active"
                  : "reviews__star reviews__star--inactive icon--active"
              }
              onClick={() => this.setState({ rating: 3 })}
            />
            <Icon
              type="star"
              className={
                this.state.rating >= 4
                  ? "reviews__star reviews__star--active icon--active"
                  : "reviews__star reviews__star--inactive icon--active"
              }
              onClick={() => this.setState({ rating: 4 })}
            />
            <Icon
              type="star"
              className={
                this.state.rating >= 5
                  ? "reviews__star reviews__star--active icon--active"
                  : "reviews__star reviews__star--inactive icon--active"
              }
              onClick={() => this.setState({ rating: 5 })}
            />
          </div>
          <div className="form__group">
            <button
              type="submit"
              className="btn btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

Review.propTypes = {
  tours: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  popupClose: PropTypes.func.isRequired,
  tourName: PropTypes.string,
  review: PropTypes.string,
  rating: PropTypes.number,
  tourId: PropTypes.string,
  editingReview: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  tours: state.tours,
  errors: state.errors,
  reviews: state.reviews,
});

export default connect(mapStateToProps, {
  postReview,
  updateUserReview,
  clearErrors,
})(Review);
