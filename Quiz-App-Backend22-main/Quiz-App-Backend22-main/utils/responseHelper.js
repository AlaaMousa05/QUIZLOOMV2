// Response formatter
const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

// Success response
const sendSuccess = (res, statusCode, message, data) => {
  return sendResponse(res, statusCode, true, message, data);
};

// Error response
const sendError = (res, statusCode, message) => {
  return sendResponse(res, statusCode, false, message);
};

// Validation error response
const sendValidationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: 'Validation error',
    errors: errors.array()
  });
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError,
  sendValidationError
};
