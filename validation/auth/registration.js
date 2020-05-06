const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

module.exports = validateRegistration = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  if (data.name.split(' ').length != 2)
    errors.name = "Full name is required"

  if (Validator.isEmpty(data.email))
    errors.email = "Email field is required";

  if (!Validator.isEmail(data.email))
    errors.email = "Email is not valid";

  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  if (!Validator.isLength(data.password, { min: 8 }))
    errors.password = "Password must be at least 8 characters";

  if (Validator.isEmpty(data.passwordConfirm))
    errors.passwordConfirm = "Confirm password field is required";

  if (!Validator.equals(data.password, data.passwordConfirm))
    errors.passwordConfirm = "Both passwords must match";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
