const isEmpty = require("../utils/isEmpty");

module.exports = validateCreateTour = (data) => {
  const errors = {};

  if (data.duration <= 0) {
    errors.duration = "Tour must last at least 1 day";
  }

  if (data.maxGroupSize <= 0) {
    errors.maxGroupSize = "Tour must accomodate at least 1 person";
  }

  if (data.price <= 0) {
    errors.price = "Tour cannot be free";
  }

  if (data.imageCover.toString() === "undefined") {
    errors.imageCover = "Tour requires a cover image";
  }

  if (data.imageCover.toString() === "undefined") {
    errors.images = "Tour requires gallery images";
  }

  if (data.images.length < 3 || data.images.length > 3) {
    errors.images = "Tour gallery requires exactly 3 images";
  }

  if (data.guides.length < 2) {
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
