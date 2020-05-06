const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

module.exports = validatePasswordUpdate = (data) => {
  const errors = {};

  data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPasswordConfirm = !isEmpty(data.newPasswordConfirm) ? data.newPasswordConfirm : "";

  if (Validator.isEmpty(data.currentPassword))
    errors.currentPassword = "Current password field is required";

  if (Validator.isEmpty(data.newPassword))
    errors.newPassword = "New password field is required";

  if (!Validator.isLength(data.newPassword, { min: 8 }))
    errors.newPassword = "New password must be at least 8 characters";

  if (Validator.isEmpty(data.newPasswordConfirm))
    errors.newPasswordConfirm = "Confirm password field is required";

  if (!Validator.equals(data.newPassword, data.newPasswordConfirm))
    errors.newPasswordConfirm = "Both new passwords must match";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};