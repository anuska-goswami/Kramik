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

export const loginUser = async ({ email, password, rememberMe = true }) => {
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'Invalid email: User not found');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Incorrect password');
  }

  const expiresIn = rememberMe ? '7d' : '1d';
  const token = signToken({ id: user._id, email: user.email }, expiresIn);

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
  const user = await User.findById(userPayload.id).select('-password').lean();
  if (!user) {
    throw new ApiError(404, 'User account no longer exists');
  }

  const userResponse = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePicture: user.profilePicture,
    provider: user.provider,
    targetRole: user.targetRole,
    targetCompany: user.targetCompany,
    experienceLevel: user.experienceLevel,
    preferences: user.preferences,
    createdAt: user.createdAt
  };

  return {
    message: 'Authorized access successful',
    user: userResponse
  };
};

export const googleLoginUser = async ({ email, fullName, googleId, profilePicture }) => {
  if (!email) {
    throw new ApiError(400, 'Email is required for Google Sign-In');
  }

  const normalizedEmail = email.toLowerCase().trim();
  let user = await User.findOne({
    $or: [
      { email: normalizedEmail },
      ...(googleId ? [{ googleId }] : [])
    ]
  });

  if (user) {
    if (!user.googleId && googleId) {
      user.googleId = googleId;
    }
    if (profilePicture && (!user.profilePicture || !user.profilePicture.url)) {
      user.profilePicture = { url: profilePicture, publicId: '' };
    }
    await user.save();
  } else {
    user = new User({
      fullName: fullName || 'Google User',
      email: normalizedEmail,
      googleId: googleId || '',
      provider: 'google',
      profilePicture: { url: profilePicture || '', publicId: '' }
    });
    await user.save();
  }

  const token = signToken({ id: user._id, email: user.email });

  const userResponse = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePicture: user.profilePicture,
    provider: user.provider,
    createdAt: user.createdAt
  };

  return {
    message: 'Google authentication successful',
    token,
    user: userResponse
  };
};

