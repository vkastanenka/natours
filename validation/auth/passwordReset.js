const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = validatePasswordReset = (data) => {
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

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
    isValid: isEmpty(errors),
  };
};
