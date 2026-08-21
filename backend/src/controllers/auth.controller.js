import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const signup = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  if (result.token) {
    res.cookie('kramik_token', result.token, COOKIE_OPTIONS);
  }
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  if (result.token) {
    const isRemembered = req.body.rememberMe !== false;
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };
    if (isRemembered) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    }
    res.cookie('kramik_token', result.token, cookieOptions);
  }
  res.status(200).json(result);
});


export const getMe = asyncHandler(async (req, res) => {
  const result = await authService.getUserProfile(req.user);
  res.status(200).json(result);
});

export const googleLogin = asyncHandler(async (req, res) => {
  const result = await authService.googleLoginUser(req.body);
  if (result.token) {
    res.cookie('kramik_token', result.token, COOKIE_OPTIONS);
  }
  res.status(200).json(result);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('kramik_token');
  res.status(200).json({ message: 'Logged out successfully' });
});

