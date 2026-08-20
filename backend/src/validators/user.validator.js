import { body } from 'express-validator';

export const updateProfileValidation = [
  body('fullName')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters'),
  body('bio')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('phone')
    .optional()
    .isString()
    .trim(),
  body('targetRole')
    .optional()
    .isString()
    .trim(),
  body('targetCompany')
    .optional()
    .isString()
    .trim(),
  body('experienceLevel')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Invalid experience level')
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Confirm password does not match new password');
      }
      return true;
    })
];

export const updatePreferencesValidation = [
  body('emailNotifications')
    .optional()
    .isBoolean()
    .withMessage('emailNotifications must be a boolean'),
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'system'])
    .withMessage('Invalid theme option'),
  body('dailyGoalMinutes')
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage('dailyGoalMinutes must be between 15 and 480'),
  body('preferredSubject')
    .optional()
    .isString()
    .trim()
];

export const deleteAccountValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password confirmation is required to delete account')
];
