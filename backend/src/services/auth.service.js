import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { ApiError } from '../utils/apiResponse.js';

export const registerUser = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  if (password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(400, 'Email already registered');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword
  });

  await newUser.save();

  const token = signToken({ id: newUser._id, email: newUser.email });

  const userResponse = {
    id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    createdAt: newUser.createdAt
  };

  return {
    message: 'User registered successfully',
    token,
    user: userResponse
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(400, 'Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password');
  }

  const token = signToken({ id: user._id, email: user.email });

  const userResponse = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt
  };

  return {
    message: 'Login successful',
    token,
    user: userResponse
  };
};

export const getUserProfile = async (userPayload) => {
  return {
    message: 'Authorized access successful',
    user: userPayload
  };
};
