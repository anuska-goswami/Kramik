import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

export const signup = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(result);
});

export const getMe = asyncHandler(async (req, res) => {
  const result = await authService.getUserProfile(req.user);
  res.status(200).json(result);
});
