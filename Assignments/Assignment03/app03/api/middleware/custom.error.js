const customError = function (req, res, status, error) {
  const errorResponse = {
    errorMessage: error,
  };

  res.status(status).json(errorResponse);
};

module.exports = { customError: customError };
