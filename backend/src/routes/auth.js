import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { signupValidation, loginValidation } from '../validators/auth.validator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/signup', authRateLimiter, signupValidation, validate, authController.signup);
router.post('/login', authRateLimiter, loginValidation, validate, authController.login);
router.post('/google', authRateLimiter, authController.googleLogin);
router.get('/me', authenticateToken, authController.getMe);

export default router;
