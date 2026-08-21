import { verifyToken } from '../utils/jwt.js';

function extractToken(req) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const parts = cookie.trim().split('=');
      if (parts.length === 2) {
        acc[parts[0]] = decodeURIComponent(parts[1]);
      }
      return acc;
    }, {});
    if (cookies.kramik_token) return cookies.kramik_token;
    if (cookies.token) return cookies.token;
  }

  return null;
}

export function authenticateToken(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export function optionalAuthenticate(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (err) {
    // If token is invalid in optional auth, proceed without attaching user
  }
  next();
}

