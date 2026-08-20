import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadSingleImage } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import {
  updateProfileValidation,
  changePasswordValidation,
  updatePreferencesValidation,
  deleteAccountValidation
} from '../validators/user.validator.js';

const router = express.Router();

// GET /api/user/profile - Fetch authenticated user profile
router.get('/profile', authenticateToken, userController.getProfile);

// PUT /api/user/profile - Update user personal & professional details
router.put('/profile', authenticateToken, updateProfileValidation, validate, userController.updateProfile);

// PUT /api/user/change-password - Change account password securely
router.put('/change-password', authenticateToken, changePasswordValidation, validate, userController.changePassword);

// POST /api/user/profile-picture - Upload profile picture to Cloudinary
router.post('/profile-picture', authenticateToken, uploadSingleImage, userController.uploadProfilePicture);

// DELETE /api/user/profile-picture - Remove profile picture
router.delete('/profile-picture', authenticateToken, userController.deleteProfilePicture);

// PUT /api/user/preferences - Update user theme, daily goals, and notification preferences
router.put('/preferences', authenticateToken, updatePreferencesValidation, validate, userController.updatePreferences);

// DELETE /api/user/account - Permanently delete user account and associated data
router.delete('/account', authenticateToken, deleteAccountValidation, validate, userController.deleteAccount);

// POST /api/user/career-guidance - AI career guidance & strategy
router.post('/career-guidance', authenticateToken, userController.getCareerGuidance);

export default router;
