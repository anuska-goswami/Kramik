import jwt from 'jsonwebtoken';

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('FATAL ERROR: JWT_SECRET environment variable is not defined.');
  }
  return secret;
};

export const signToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
