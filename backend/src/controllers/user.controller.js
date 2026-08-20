import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/User.js';
import * as aiService from '../services/ai.service.js';
import { ApiError } from '../utils/apiResponse.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password').lean();
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.status(200).json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullName },
    { new: true, runValidators: true }
  ).select('-password');
  res.status(200).json(user);
});

export const getCareerGuidance = asyncHandler(async (req, res) => {
  const guidance = await aiService.generateAiCareerGuidance(req.body);
  res.status(200).json(guidance);
});
