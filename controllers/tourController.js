const Tour = require("./../models/tourModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const sharp = require("sharp");
const multer = require("multer");

const multerStorage = multer.memoryStorage();

// Test if the file is an image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images...", 400), false);
  }
};

// Configuring multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

// upload.single('image'); req.file
// upload.array("images", 5); req.files

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1. Cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // 2. Images
  req.body.images = [];

  // map will save an array of promises
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

// Alias route for the top 5 tours sorted by descending average rating, and then price
// Middleware which adds limit, sort, fields properties to query => Affects getAllTours
exports.aliasTopRatedTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage";
  req.query.fields =
    "name,price,ratingsAverage,summary,difficulty,startLocation,duration";
  next();
};

exports.aliasTopCheapestTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price";
  req.query.fields =
    "name,price,ratingsAverage,summary,difficulty,startLocation,duration";
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, "reviews");
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// DISTANCES

// /tours-within/:distance/center/:latlng/unit/:unit,
// /tours-distance/233/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat,lng.",
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { data: tours }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat,lng.",
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: "distance",
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances
    }
  });
});

// AGGREGATION PIPELINE

exports.getTourStats = catchAsync(async (req, res, next) => {
  // Aggregate()
  const stats = await Tour.aggregate([
    {
      $group: {
        // _id: "$ratingsAverage",
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: "success",
    data: { stats }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // $unwind will deconstruct an array field from the input documents, and then output one document for each element of the array
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" }
      }
    },
    {
      $addFields: { month: "$_id" }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { month: 1 }
    },
    {
      $limit: 6
    }
  ]);

  res.status(200).json({
    status: "success",
    data: { plan }
  });
});

TODO: // Populate guide ids with actual guides instead of just IDs
exports.getCompanySchedule = catchAsync(async (req, res, next) => {
  let guides = await User.find({ role: { $in: ['guide', 'lead-guide']} });

  const schedule = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $group: {
        _id: "$startDates",
        tour: { $first: '$name' },
        guides: { $first: "$guides" },
        duration: { $first: '$duration' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  console.log(guides);

  res.status(200).json({
    status: "success",
    data: { schedule }
  });
});

