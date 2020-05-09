// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { postReview } from "../../store/actions/reviewActions";
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
    disableSubmitButton: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loggingIn: false,
        disableLoginButton: false,
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

    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    // 1. State to change button text
    this.setState({ submittingReview: true, disableSubmitButton: true });

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
    if (Object.keys(this.state.errors) === 0) {
      this.setState({ submittedReview: true });
      this.timer = setTimeout(() => {
        this.setState({ submittedReview: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    console.log(this.props.auth.user);

    const errors = [];

    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        {this.state.submittedReview ? (
          <Alert type="success" message="Submitted review!" />
        ) : null}
        <form className="form authenticate-form" onSubmit={this.onReviewSubmit}>
          <Icon
            type="x"
            className="icon icon--large icon--black-primary icon--translate icon--active form__close-icon"
            onClick={this.props.popupClose}
          />
          <h2 className="heading-secondary heading-secondary--small">
            Submit a review for
          </h2>
          <br />
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            {`${this.props.tours.tour.name} Tour`}
          </h2>
          <TextAreaGroup
            name="review"
            id="review"
            inputClass='form__textarea'
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
              disabled={this.state.disableLoginButton}
            >
              {!this.state.submittingReview
                ? "Submit Review"
                : "Submitting Review..."}
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
  popupClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tours: state.tours,
});

export default connect(mapStateToProps, { postReview, clearErrors })(Review);
