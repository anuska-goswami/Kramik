import { body } from 'express-validator';

export const saveResumeValidation = [
  body('personalInfo.fullName')
    .notEmpty()
    .withMessage('Full name is required in personal info'),
  body('personalInfo.email')
    .notEmpty()
    .withMessage('Email address is required in personal info')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('templateId')
    .optional()
    .isIn(['modern', 'classic', 'minimal', 'executive', 'tech'])
    .withMessage('Invalid template ID')
];

export const aiGenerateValidation = [
  body('type')
    .notEmpty()
    .isIn(['summary', 'bullets'])
    .withMessage('Type must be either "summary" or "bullets"')
];
