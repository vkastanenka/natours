const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

// Sending contact email
module.exports = validateContact = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.emailBody = !isEmpty(data.emailBody) ? data.emailBody : "";

  // Name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (
    data.name.split(" ").length < 2 ||
    data.name.split(" ").length > 3
  ) {
    errors.name = "Full name is required";
  }

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  // Email body
  if (Validator.isEmpty(data.emailBody)) {
    errors.emailBody = "Email body is required";
  } else if (!Validator.isLength(data.emailBody, { max: 500 })) {
    errors.emailBody = "Email body has a limit of 500 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
