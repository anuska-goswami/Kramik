import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import UserProgress from '../models/UserProgress.js';
import MockTestAttempt from '../models/MockTestAttempt.js';
import InterviewSession from '../models/InterviewSession.js';
import Resume from '../models/Resume.js';
import RoadmapGoal from '../models/RoadmapGoal.js';
import UserCompanyProgress from '../models/UserCompanyProgress.js';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary.service.js';
import { ApiError } from '../utils/apiResponse.js';

/**
 * Fetch authenticated user profile
 */
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password').lean();
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }
  return user;
};

/**
 * Update personal and professional details
 */
export const updateUserProfile = async (userId, updateData) => {
  const allowedFields = ['fullName', 'bio', 'phone', 'targetRole', 'targetCompany', 'experienceLevel'];
  const updatePayload = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      updatePayload[field] = updateData[field];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updatePayload },
    { new: true, runValidators: true }
  ).select('-password').lean();

  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }

  return updatedUser;
};

/**
 * Change user password securely
 */
export const changeUserPassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return { message: 'Password changed successfully' };
};

/**
 * Upload profile picture to Cloudinary and update profile
 */
export const uploadUserProfilePicture = async (userId, fileBuffer) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!fileBuffer) {
    throw new ApiError(400, 'Image file is required');
  }

  // Delete previous Cloudinary image if it exists
  if (user.profilePicture && user.profilePicture.publicId) {
    await deleteFromCloudinary(user.profilePicture.publicId);
  }

  // Upload new image to Cloudinary
  const uploadResult = await uploadToCloudinary(fileBuffer, 'kramik/profile_pictures');

  user.profilePicture = {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id
  };

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

/**
 * Delete profile picture from Cloudinary and reset field
 */
export const deleteUserProfilePicture = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.profilePicture && user.profilePicture.publicId) {
    await deleteFromCloudinary(user.profilePicture.publicId);
  }

  user.profilePicture = { url: '', publicId: '' };
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (userId, preferencesData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.preferences = {
    ...user.preferences.toObject(),
    ...preferencesData
  };

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

/**
 * Delete user account and cascade delete all associated data
 */
export const deleteUserAccount = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Incorrect password. Account deletion aborted.');
  }

  // Remove Cloudinary image
  if (user.profilePicture && user.profilePicture.publicId) {
    await deleteFromCloudinary(user.profilePicture.publicId);
  }

  // Cascade deletion across all user data collections
  await Promise.all([
    UserProgress.deleteMany({ user: userId }),
    MockTestAttempt.deleteMany({ user: userId }),
    InterviewSession.deleteMany({ user: userId }),
    Resume.deleteMany({ user: userId }),
    RoadmapGoal.deleteMany({ user: userId }),
    UserCompanyProgress.deleteMany({ user: userId })
  ]);

  // Delete user record
  await User.findByIdAndDelete(userId);

  return { message: 'User account and associated data deleted successfully' };
};
