import { query, body, param } from 'express-validator';

export const getCompaniesValidation = [
  query('search')
    .optional()
    .isString()
    .trim(),
  query('industry')
    .optional()
    .isString()
    .trim(),
  query('tier')
    .optional()
    .isIn(['MAANG', 'Product-Based', 'Service-Based', 'Startup'])
    .withMessage('Invalid tier category'),
  query('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Invalid difficulty level'),
  query('bookmarkedOnly')
    .optional()
    .isBoolean()
    .toBoolean(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
];

export const companySlugParamValidation = [
  param('slug')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Company slug is required')
];

export const recordAptitudeAttemptValidation = [
  param('slug')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Company slug is required'),
  body('questionId')
    .isMongoId()
    .withMessage('Valid questionId is required'),
  body('isCorrect')
    .optional()
    .isBoolean()
    .withMessage('isCorrect must be a boolean')
];

export const toggleInterviewCompletionValidation = [
  param('slug')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Company slug is required'),
  body('questionId')
    .isMongoId()
    .withMessage('Valid questionId is required')
];
