// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getAllReviews } from "../../../../store/actions/reviewActions";

// Components
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";
import Spinner from "../../../../components/Spinner/Spinner";
import ReviewCard from "../../../../components/Cards/ReviewCard";
import InputGroup from "../../../../components/Inputs/InputGroup";
import SelectGroup from "../../../../components/Inputs/SelectGroup";

// Page to filter and manage site reviews
class ManageReviews extends Component {
  state = {
    reviews: null,
    filteredReviews: null,
    tours: [],
    tourFilter: "",
    userFilter: "",
    pages: "",
    currentPage: 1,
  };

  async componentDidMount() {
    // If role is not admin or lead-guide, push them to their settings page
    const { role } = this.props.auth.user;
    if (role === "user" || role === "guide") {
      this.props.history.push("/account/settings");
    } else if (role === "admin" || role === "lead-guide") {
      // Add reviews to global state
      await this.props.getAllReviews();
      const { allReviews } = this.props.reviews;
      const tours = allReviews.map((review) => review.tour.name);
      const newToursSet = [...new Set(tours)];
      this.setState({
        reviews: allReviews,
        filteredReviews: allReviews,
        tours: newToursSet,
        pages: Math.ceil(allReviews.length / 10),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // If deleted a review, make sure to update in state
    if (this.props.reviews.allReviews) {
      if (this.props.reviews.allReviews.length !== nextProps.reviews.allReviews.length) {
        this.setState({
          reviews: nextProps.reviews.allReviews,
          filteredReviews: nextProps.reviews.allReviews,
          pages: Math.ceil(nextProps.reviews.allReviews.length / 10),
        });
      }
    }
  }

  // Handling review filters
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.tourFilter !== prevState.tourFilter ||
      this.state.userFilter !== prevState.userFilter
    ) {
      // eslint-disable-next-line
      const filteredReviews = this.state.reviews.filter((review) => {
        let userName;
        // For tour filter and user filter
        if (this.state.tourFilter && this.state.userFilter) {
          userName = review.user.name.toLowerCase();
          if (
            review.tour.name === this.state.tourFilter &&
            userName.startsWith(this.state.userFilter.toLowerCase())
          ) {
            return review;
          }
          // For tour filter
        } else if (this.state.tourFilter) {
          if (review.tour.name === this.state.tourFilter) {
            return review;
          }
          // For user filter
        } else if (this.state.userFilter) {
          userName = review.user.name.toLowerCase();
          if (userName.startsWith(this.state.userFilter.toLowerCase())) {
            return review;
          }
        } else {
          return review;
        }
      });
      this.setState({
        filteredReviews: filteredReviews,
        pages: Math.ceil(filteredReviews.length / 10),
        currentPage: 1,
      });
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let content;
    let reviews;
    let tourSelect;
    let tourOptions;
    let pageNumbers = [];
    const allReviews = this.state.filteredReviews;
    const { loading } = this.props.reviews;

    if (loading || !allReviews) content = <Spinner />;
    else {
      tourOptions = this.state.tours.map((tour) => {
        return { value: tour, label: tour };
      });

      tourOptions.unshift({
        value: "",
        label: "Tour",
      });

      tourSelect = (
        <SelectGroup
          name="tourFilter"
          options={tourOptions}
          id="tourFilter"
          value={this.state.tourFilter}
          onChange={(e) => this.onChange(e)}
        />
      );

      // eslint-disable-next-line
      const filteredReviews = allReviews.filter((review, index) => {
        if (
          index < this.state.currentPage * 10 &&
          index >= this.state.currentPage * 10 - 10
        ) {
          return review;
        }
      });

      reviews = filteredReviews.map((review) => {
        return (
          <ReviewCard
            key={review._id}
            cardClassName="reviews__card--border reviews__card--wider"
            imageURL={require(`../../../../assets/images/users/${review.user.photo}`)}
            name={review.user.name}
            tourName={review.tour.name}
            review={review.review}
            rating={review.rating}
            page="manageReviews"
            reviewId={review._id}
          />
        );
      });

      for (let i = 1; i <= this.state.pages; i++) {
        pageNumbers.push(
          <p key={i} onClick={() => this.setState({ currentPage: i })}>
            {i}
          </p>
        );
      }

      content = (
        <Auxiliary>
          <div className="review-filter">
            <p>Filter reviews by:</p>
            <InputGroup
              type="text"
              name="userFilter"
              id="userFilter"
              placeholder="User"
              value={this.state.userFilter}
              onChange={(e) => this.onChange(e)}
            />
            {tourSelect}
          </div>
          <div className="review-grid ma-bt-lg">{reviews}</div>
          {this.state.pages ? <div className="page-numbers">{pageNumbers}</div> : null}
        </Auxiliary>
      );
    }
    return content;
  }
}

ManageReviews.propTypes = {
  auth: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  reviews: state.reviews,
});

export default connect(mapStateToProps, { getAllReviews })(ManageReviews);
