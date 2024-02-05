const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // setting defaults
    statusCode: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Went Wrong. Try Again!",
  };

  // handling Errors Folder errors
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // handling user registration validation
  if (err.name === "ValidationError") {
    (customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ")),
      (customError.statusCode = 400);
  }

  // handling Email Duplicate
  if (err.code && err.code === 11000) {
    (customError.msg = `Duplicate value Entered for ${Object.keys(
      err.keyValue
    )} Field. Please Choose Another Value`),
      (customError.statusCode = 400);
  }

  // handling Id Cast Error
  if (err.name === "CastError") {
    (customError.msg = `No Item With ID: ${err.value} Found`),
      (customError.statusCode = 400);
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
