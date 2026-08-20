import { asyncHandler } from '../utils/asyncHandler.js';

export const getHealth = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Kramik API is running smoothly.' });
});
