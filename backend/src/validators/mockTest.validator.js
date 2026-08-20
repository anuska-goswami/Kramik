import { query, body, param } from 'express-validator';

export const generateTestValidation = [
  body('title')
    .optional()
    .isString()
    .trim(),
  body('presetSlug')
    .optional()
    .isString()
    .trim(),
  body('subjectIds')
    .optional(),
  body('totalQuestions')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Total questions must be between 1 and 100'),
  body('timeLimitMinutes')
    .optional()
    .isInt({ min: 5, max: 180 })
    .withMessage('Time limit must be between 5 and 180 minutes'),
  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard', 'Mixed'])
    .withMessage('Invalid difficulty level')
];

export const submitTestValidation = [
  param('attemptId')
    .isMongoId()
    .withMessage('Valid attemptId is required'),
  body('answers')
    .isArray()
    .withMessage('answers must be an array'),
  body('answers.*.questionId')
    .isMongoId()
    .withMessage('Valid questionId is required for each answer'),
  body('answers.*.selectedOption')
    .optional({ nullable: true }),
  body('answers.*.timeTakenSeconds')
    .optional()
    .isInt({ min: 0 })
];

export const attemptIdParamValidation = [
  param('attemptId')
    .isMongoId()
    .withMessage('Valid attemptId is required')
];

export const leaderboardValidation = [
  query('subjectId')
    .optional()
    .isString()
    .trim(),
  query('period')
    .optional()
    .isIn(['all-time', 'monthly', 'weekly'])
    .withMessage('Invalid period parameter'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
];

export const historyQueryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt(),
  query('status')
    .optional()
    .isIn(['draft', 'in-progress', 'completed', 'expired'])
    .withMessage('Invalid status filter')
];

