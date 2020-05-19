const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = validateRegistration = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.emailBody = !isEmpty(data.emailBody) ? data.emailBody : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (data.name.split(" ").length < 2 || data.name.split(" ").length > 3) {
    errors.name = "Full name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.emailBody)) {
    errors.emailBody = "Email body is required";
  }

  if (data.emailBody.length > 500) {
    errors.emailBody = "Email body has a limit of 500 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
