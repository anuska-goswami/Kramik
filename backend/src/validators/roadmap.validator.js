import { body } from 'express-validator';

export const createGoalValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Goal title is required'),
  body('targetDays')
    .notEmpty()
    .withMessage('Target duration in days is required')
    .isInt({ min: 1 })
    .withMessage('Target duration must be an integer of at least 1 day'),
  body('description')
    .optional()
    .trim(),
  body('subjectId')
    .optional()
    .trim()
];

export const updateGoalValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Goal title cannot be empty'),
  body('targetDays')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Target duration must be an integer of at least 1 day'),
  body('description')
    .optional()
    .trim()
];
