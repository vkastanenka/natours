const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

module.exports = validateRegistration = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (data.name.split(' ').length != 2)
    errors.name = "Full name is required"

  if (Validator.isEmpty(data.email))
    errors.email = "Email field is required";

  if (!Validator.isEmail(data.email))
    errors.email = "Email is not valid";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
