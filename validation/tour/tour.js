const isEmpty = require("../utils/isEmpty");

module.exports = validateCreateTour = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.maxGroupSize = !isEmpty(data.maxGroupSize) ? data.maxGroupSize : "";
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.summary = !isEmpty(data.summary) ? data.summary : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.imageCover = !isEmpty(data.imageCover) ? data.imageCover : "";
  data.images = !isEmpty(data.images) ? data.images : "";
  data.startDates = !isEmpty(data.startDates) ? data.startDates : "";
  data.startLocation = !isEmpty(data.startLocation) ? data.startLocation : "";
  data.guides = !isEmpty(data.guides) ? data.guides : "";
  data.locations = !isEmpty(data.locations) ? data.locations : "";

  // Name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Duration
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  } else if (data.duration <= 0) {
    errors.duration = "Tour must last at least 1 day";
  }

  // Max group size
  if (Validator.isEmpty(data.maxGroupSize)) {
    errors.maxGroupSize = "Max group size field is required";
  } else if (data.maxGroupSize <= 0) {
    errors.maxGroupSize = "Tour must accomodate at least 1 person";
  }

  // Difficulty
  if (Validator.isEmpty(data.difficulty)) {
    errors.difficulty = "Difficulty field is required";
  } else if (["easy", "medium", "difficult"].indexOf(data.difficulty) === -1) {
    errors.difficulty = "Tour must be either easy, medium, or difficulty";
  }

  // Price
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }
  if (data.price <= 0) {
    errors.price = "Tour cannot be free";
  }

  // Summary
  if (Validator.isEmpty(data.summary)) {
    errors.summary = "Summary field is required";
  }

  // Description
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  // Image cover
  if (data.imageCover.toString() === "undefined") {
    errors.imageCover = "Tour requires a cover image";
  }

  // Images
  if (data.images.toString() === "undefined") {
    errors.images = "Tour requires gallery images";
  } else if (data.images.length < 3 || data.images.length > 3) {
    errors.images = "Tour gallery requires exactly 3 images";
  }

  // Start dates
  if (Validator.isEmpty(data.startDates)) {
    errors.startDates = "Tour requires at least 1 start date";
  }

  // Start dates
  if (Validator.isEmpty(data.startDates)) {
    errors.startDates = "Tour requires at least 1 start date";
  }

  // Start location
  if (Validator.isEmpty(data.startLocation)) {
    errors.startLocation = "Tour requires a start location";
  }

  // Guides
  if (Validator.isEmpty(data.guides)) {
    errors.guides = "Guides are required";
  } else if (data.guides.length < 2) {
    errors.guides =
      "Tour requires at least one lead-guide and one regular guide";
  }

  let guideOccurence = false;

  data.guides.forEach((guide) => {
    if (data.guides.indexOf(guide) !== data.guides.lastIndexOf(guide)) {
      guideOccurence = true;
    }
  });

  if (guideOccurence) {
    errors.guides =
      "Same guide cannot be assigned more than once on the same tour";
  }

  // Locations
  if (Validator.isEmpty(data.locations)) {
    errors.locations = "Tour requires a locations";
  }

  let actualLatitude = true;
  let actualLongitude = true;

  data.locations.forEach((location) => {
    if (location.coordinates[0] < -180 || location.coordinates[0] > 180) {
      actualLongitude = false;
    }

    if (location.coordinates[1] < -90 || location.coordinates[1] > 90) {
      actualLatitude = false;
    }
  });

  if (!actualLatitude) {
    errors.latitude = "Location latitude must be between -90 and 90";
  }

  if (!actualLongitude) {
    errors.longitude = "Location longitude must be between -180 and 180";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
