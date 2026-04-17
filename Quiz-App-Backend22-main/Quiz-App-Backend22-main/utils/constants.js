// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

// User Roles
const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student'
};

// Question Types
const QUESTION_TYPES = {
  TF: 'true-false',
  MCQ: 'multiple-choice'
};

// Result Status
const RESULT_STATUS = {
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  PENDING: 'pending'
};

// Quiz Status
const QUIZ_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

// Error Messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  TOKEN_INVALID: 'Invalid or expired token',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SERVER_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database error occurred',
  VALIDATION_ERROR: 'Validation error',
  QUIZ_NOT_FOUND: 'Quiz not found',
  QUESTION_NOT_FOUND: 'Question not found',
  CATEGORY_NOT_FOUND: 'Category not found',
  RESULT_NOT_FOUND: 'Result not found'
};

// Success Messages
const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  UPDATE_SUCCESS: 'Updated successfully',
  CREATED_SUCCESS: 'Created successfully',
  DELETED_SUCCESS: 'Deleted successfully',
  SUBMITTED_SUCCESS: 'Submitted successfully'
};

module.exports = {
  HTTP_STATUS,
  ROLES,
  QUESTION_TYPES,
  RESULT_STATUS,
  QUIZ_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};
