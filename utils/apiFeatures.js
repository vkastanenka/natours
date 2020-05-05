class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

// // Query =>
// // http://localhost:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&sort=price,ratingsAverage&limit=10

// // Build Query
// // 1. Basic Filtering
// const queryObj = { ...req.query };
// // console.log(queryObj); =>
// // { duration: { gte: '5' }, difficulty: 'easy', page: '2', sort: 'price,ratingsAverage', limit: '10' }

// const excludedFields = ["page", "sort", "limit", "fields"];
// excludedFields.forEach(field => delete queryObj[field]);
// // console.log(queryObj); =>
// // { duration: { gte: '5' }, difficulty: 'easy' }

// // 2. Advanced Filtering
// // Convert query object into a string
// let queryStr = JSON.stringify(queryObj);
// // console.log(queryStr); =>
// // {"duration":{"gte":"5"},"difficulty":"easy"}

// // Replace operators with MongoDB operators
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
// // console.log(queryStr);
// // {"duration":{"$gte":"5"},"difficulty":"easy"}

// // Store the query of replaced queryStr object
// let query = Tour.find(JSON.parse(queryStr));

// // 3. Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(",").join(" ");
//   // console.log(sortBy); =>
//   // 'price ratingsAverage'
//   query = query.sort(sortBy);
// } else {
//   // In case the user does not specify any sort field in the URL query string, will still sort by newest created tours first
//   query = query.sort("-createdAt");
// }

// // 4. Field Limiting
// if (req.query.fields) {
//   // Mongoose requests a string with the field name separated by spaces
//   const fields = req.query.fields.split(",").join(" ");
//   query = query.select(fields);
// } else {
//   // Returns the entire query but without __v (- is not including, but excluding) => Can also query in the URL to not have the field included
//   query = query.select("-__v");
// }

// // 5. Pagination => Allowing the user to only select a certain page of our results
// // pages=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;

// // limit() => Amount of results that we want in the query
// // skip() => Amount of results that should be skipped before querying data
// query = query.skip(skip).limit(limit);

// // Throwing an error when user requests a page that does not exist
// if (req.query.page);
// {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error("This page does not exist!");
// }

// // Await the query
// const tours = await query;
