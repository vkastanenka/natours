const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

// Writing / updating a review
module.exports = validateReview = (data) => {
  const errors = {};

  data.review = !isEmpty(data.review) ? data.review : "";
  data.rating = !isEmpty(data.rating) ? data.rating : "";
  data.tour = !isEmpty(data.tour) ? data.tour : "";
  data.user = !isEmpty(data.user) ? data.user : "";

  // Review
  if (Validator.isEmpty(data.review)) {
    errors.review = "Review content is required";
  }

  // Rating
  if (data.rating < 1 || data.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }

  // Tour
  if (Validator.isEmpty(data.tour)) {
    errors.tour = "Review must belong to a tour";
  }

  // User
  if (Validator.isEmpty(data.tour)) {
    errors.user = "Review must belong to a user";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
