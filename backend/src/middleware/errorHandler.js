import { ApiError } from '../utils/apiResponse.js';

export function errorHandler(err, req, res, next) {
  // Log full error internally for debugging
  console.error('API Error:', err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.kind === 'ObjectId' || err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid question ID format' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Not allowed by CORS policy' });
  }

  const statusCode = err.statusCode && typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal server error';

  res.status(statusCode).json({ error: message });
}
