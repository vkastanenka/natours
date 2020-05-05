const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

/*
//////////////
deleteOne

> Asynchronous function which deletes a document with findByIdAndDelete

1. Wrap in catchAsync to catch any asynchronous errors that occur
2. Execute findByIdAndDelete to remove the document from the collection
4. If no document found with that ID, send a new AppError
3. If found, send a 204 response back with json of status, and data
*/

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    // findByIdAndDelete(): Issue a MongoDB findOneAndDelete() command by a document's _id field. In other words, findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }).
    const doc = await Model.findByIdAndDelete(req.params.id);

    // Error response with message (1st argument), statusCode (2nd argument), status (fail or error depending on if status code starts with 4), and isOperational set to true
    if (!doc) return next(new AppError("No document found with that ID", 404));

    // JSON that is sent back (204: No Content)
    res.status(204).json({
      status: "success",
      data: null
    });
  });

/*
//////////////
updateOne

> Asynchronous function which obtains a document that we find through an id in req.params.id and updates it with findByIdAndUpdate

1. Wrap in catchAsync to catch any asynchronous errors that occur
2. Find and update a document by id with Model.findByIdAndUpdate passing in req.params.id to match the document and req.body for fields to update. Pass in new: true to return the modified document and runValidators: true to run update validator's against the Model's schema
4. If no document found with that ID, send a new AppError
3. If found, send a 200 response back with json of status, and data
*/

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // Finds a matching document (to first arg), updates it according the the update arg (2nd arg), passing any options, and returns the found document (if any) to the callback
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      // new: bool - true to return the modified document rather than the original. defaults to false
      new: true,
      // runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
      runValidators: true
    });

    // Error response with message (1st argument), statusCode (2nd argument), status (fail or error depending on if status code starts with 4), and isOperational set to true
    if (!doc) return next(new AppError("No document found with that ID", 404));

    // JSON that is sent back (200: OK)
    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });

/*
//////////////
createOne

> Asynchronous function which creates a document using data we pass into Model.create() from the request's body

1. Wrap in catchAsync to catch any asynchronous errors that occur
2. Create a document by calling create on the passed in model with req.body as values for schema
3. If found, send a 201 response back with json of status, and data
*/

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // Model.ceate(): Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs
    const doc = await Model.create(req.body);

    // JSON that is sent back (201: Created)
    res.status(201).json({
      status: "success",
      data: { data: doc }
    });
  });

/*
//////////////
getOne

> Asynchronous function which obtains a document that we find through an id in req.params.id

1. Wrap in catchAsync to catch any asynchronous errors that occur
2. Query is obtained by calling findById() on Model with an argument of req.params.id
3. If there are populate options, populate the virtual schema field passed in as popOptions i.e. "reviews" for tour model
4. If no document was found with that id, return a new error
5. If found, send a 200 response back with json of status, and data
*/

exports.getOne = (Model, popOptions) =>
  // catchAsync => In the case of asynchronous errors, executes a catch block on the promise that is the result of the function it wraps
  catchAsync(async (req, res, next) => {
    // Model.findById(): Finds a single document by its _id field.
    let query = Model.findById(req.params.id);

    // Virtual property populate
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    // Error response with message (1st argument), statusCode (2nd argument), status (fail or error depending on if status code starts with 4), and isOperational set to true
    if (!doc) return next(new AppError("No document found with that ID", 404));

    // JSON that is sent back (200: OK)
    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });


/*
//////////////
getAll

> Asynchronous function which obtains a collection that we find through Model.find

1. Wrap in catchAsync to catch any asynchronous errors that occur
2. Execute findByIdAndDelete to remove the document from the collection
4. If no document found with that ID, send a new AppError
3. If found, send a 204 response back with json of status, and data
*/

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // Allowing for nested routes
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    if (req.params.userId) filter = { user: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    // Provides statistics
    // const doc = await features.query.explain();

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: { data: doc }
    });
  });
