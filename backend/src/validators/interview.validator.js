import { query, body, param } from 'express-validator';

export const getQuestionsValidation = [
  query('type')
    .optional()
    .isIn(['technical', 'hr'])
    .withMessage('Type must be technical or hr'),
  query('category')
    .optional()
    .isString()
    .trim(),
  query('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Invalid difficulty level'),
  query('search')
    .optional()
    .isString()
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
];

export const startInterviewValidation = [
  body('type')
    .optional()
    .isIn(['technical', 'hr', 'mixed'])
    .withMessage('Interview type must be technical, hr, or mixed'),
  body('targetRole')
    .optional()
    .isString()
    .trim(),
  body('questionCount')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Question count must be between 1 and 20'),
  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Invalid difficulty level'),
  body('category')
    .optional()
    .isString()
    .trim()
];

export const submitAnswerValidation = [
  param('sessionId')
    .isMongoId()
    .withMessage('Valid sessionId is required'),
  body('questionIndex')
    .isInt({ min: 0 })
    .withMessage('Valid questionIndex is required'),
  body('userAnswer')
    .isString()
    .withMessage('userAnswer must be a string')
];

export const sessionIdParamValidation = [
  param('sessionId')
    .isMongoId()
    .withMessage('Valid sessionId is required')
];
