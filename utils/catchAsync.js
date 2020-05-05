// The purpose of this function is to catch asynchronous errors: Asynchronous function is passed in, and if there is an error, then the promise gets rejected
module.exports = fn => {
  // Need to pass in next so the error can be handled in the global error handling middleware
  // Returns a function because it shouldn't be the result of calling a function, but a function itself => Should sit and wait for express to call it
  return (req, res, next) => {
    // The function returns a promise, and code below catches errors
    // .catch(next) works because we just need to pass it in and it will be called automatically with the parameter that the callback receives (err) (err => next(err) is the same as err in the catch block)
    fn(req, res, next).catch(next);
  };
};