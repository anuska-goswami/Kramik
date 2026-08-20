import { body } from 'express-validator';

export const personalizedRoadmapValidation = [
  body('targetRole')
    .optional()
    .isString()
    .trim(),
  body('targetCompany')
    .optional()
    .isString()
    .trim(),
  body('currentSkillLevel')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Invalid skill level'),
  body('dailyTimeMinutes')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('Daily time must be between 15 and 480 minutes'),
  body('targetWeeks')
    .optional()
    .isInt({ min: 1, max: 52 })
    .withMessage('Target weeks must be between 1 and 52')
];

export const resumeGenerateValidation = [
  body('targetRole')
    .optional()
    .isString()
    .trim(),
  body('skills')
    .optional()
    .isArray(),
  body('experienceYears')
    .optional()
    .isInt({ min: 0 })
];

export const resumeReviewValidation = [
  body('resumeData')
    .isObject()
    .withMessage('resumeData object is required')
];

export const interviewAnswerValidation = [
  body('questionTitle')
    .isString()
    .notEmpty()
    .withMessage('questionTitle is required'),
  body('userAnswer')
    .isString()
    .withMessage('userAnswer must be a string')
];

export const questionExplanationValidation = [
  body('questionTitle')
    .isString()
    .notEmpty()
    .withMessage('questionTitle is required')
];

export const careerGuidanceValidation = [
  body('targetRole')
    .optional()
    .isString()
    .trim(),
  body('targetCompany')
    .optional()
    .isString()
    .trim()
];
