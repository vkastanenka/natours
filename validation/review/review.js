const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

module.exports = validateRegistration = (data) => {
  const errors = {};

  data.review = !isEmpty(data.review) ? data.review : "";

  if (Validator.isEmpty(data.review))
    errors.review = "Review content is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
