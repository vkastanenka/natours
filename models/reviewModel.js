const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "This review must belong to a tour!"]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "This review must belong to a user!"]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Preventing duplicate reviews
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Populating tour and user ids with the actual data
reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: "tour",
  //   select: "name"
  // }).populate({
  //   path: "user",
  //   select: "name photo"
  // });
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
});

// In static method, this keyword points to the current model
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    // Select all the reviews that actually belong to the user that was passed in as the argument
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    }
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

// CALCULATING AVERAGE RATINGS ON TOURS

reviewSchema.post("save", function(next) {
  // this points to the current review
  this.constructor.calcAverageRatings(this.tour);
  // next();
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  // this points to current query
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

//

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

// POST /tour/tour_id/reviews => user id will come from the currently logged in user
