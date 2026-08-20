import { asyncHandler } from '../utils/asyncHandler.js';
import * as userService from '../services/user.service.js';
import * as aiService from '../services/ai.service.js';

/**
 * GET /api/user/profile - Fetch authenticated user profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getUserProfile(req.user.id);
  res.status(200).json(profile);
});

/**
 * PUT /api/user/profile - Update personal and professional details
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
  res.status(200).json(updatedUser);
});

/**
 * PUT /api/user/change-password - Change user password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const result = await userService.changeUserPassword(req.user.id, req.body);
  res.status(200).json(result);
});

/**
 * POST /api/user/profile-picture - Upload profile picture to Cloudinary
 */
export const uploadProfilePicture = asyncHandler(async (req, res) => {
  const fileBuffer = req.file ? req.file.buffer : null;
  const updatedUser = await userService.uploadUserProfilePicture(req.user.id, fileBuffer);
  res.status(200).json(updatedUser);
});

/**
 * DELETE /api/user/profile-picture - Delete profile picture from Cloudinary
 */
export const deleteProfilePicture = asyncHandler(async (req, res) => {
  const updatedUser = await userService.deleteUserProfilePicture(req.user.id);
  res.status(200).json(updatedUser);
});

/**
 * PUT /api/user/preferences - Update profile preferences
 */
export const updatePreferences = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUserPreferences(req.user.id, req.body);
  res.status(200).json(updatedUser);
});

/**
 * DELETE /api/user/account - Delete user account & cascade clean data
 */
export const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const result = await userService.deleteUserAccount(req.user.id, password);
  res.status(200).json(result);
});

/**
 * POST /api/user/career-guidance - AI career guidance
 */
export const getCareerGuidance = asyncHandler(async (req, res) => {
  const guidance = await aiService.generateAiCareerGuidance(req.body);
  res.status(200).json(guidance);
});
