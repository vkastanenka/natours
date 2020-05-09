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

class Review extends Component {
  state = {
    review: "",
    rating: 5,
    submittingReview: false,
    submittedReview: false,
    updatingReview: false,
    updatedReview: false,
    disableSubmitButton: false,
    errors: {},
  };

  componentDidMount() {
    if (this.props.editingReview) {
      this.setState({ review: this.props.review, rating: this.props.rating });
    }
  }

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        submittingReview: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    if (nextProps.errors && this.props.editingReview) {
      this.setState({
        errors: nextProps.errors,
        updatingReview: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    this.timer = null;
    clearTimeout(this.timer);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request for a new review
  onReviewSubmit = async (e) => {
    e.preventDefault();

    // Clear errors if any
    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    // 1. State to change button text
    this.setState({
      submittingReview: true,
      disableSubmitButton: true,
    });

    if (this.state.submittedReview) {
      this.setState({ submittedReview: false });
    }

    // 2. Review data to post
    const reviewData = {
      review: this.state.review,
      rating: this.state.rating,
      tour: this.props.tours.tour.id,
      user: this.props.auth.user.id,
    };

    // 3. Post review
    await this.props.postReview(reviewData);

    // 4. Show alert it worked
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        review: "",
        submittedReview: true,
        submittingReview: false,
        disableSubmitButton: false,
      });
    }
  };

  // Make a patch request to update a review
  onReviewUpdate = async (e) => {
    e.preventDefault();

    // 1. State to change button text
    this.setState({
      updatingReview: true,
      disableSubmitButton: true,
    });

    if (this.state.updatedReview) {
      this.setState({ updatedReview: false });
    }

    // 2. Review data to update
    const reviewData = {
      review: this.state.review,
      rating: this.state.rating,
    };

    // 3. Patch review
    await this.props.updateUserReview(this.props.reviewId, reviewData);
  };

  render() {
    const errors = [];
    let buttonText = "Submit review";

    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    if (this.props.editingReview) {
      buttonText = "Update review";
    } else if (this.props.editingReview && this.state.updatingReview) {
      buttonText = "Updating review...";
    } else if (this.state.submittingReview) {
      buttonText = "Submitting review...";
    }

    return (
      <Auxiliary>
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        {this.state.submittedReview ? (
          <Alert type="success" message="Submitted review!" />
        ) : null}
        <form
          className="form authenticate-form"
          onSubmit={
            this.props.editingReview ? this.onReviewUpdate : this.onReviewSubmit
          }
        >
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
  auth: PropTypes.object.isRequired,
  tours: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  popupClose: PropTypes.func.isRequired,
  tourName: PropTypes.string,
  review: PropTypes.string,
  rating: PropTypes.number,
  editingReview: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tours: state.tours,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  postReview,
  updateUserReview,
  clearErrors,
})(Review);
