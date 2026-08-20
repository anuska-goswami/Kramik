import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/user/profile - Get current user profile
router.get('/profile', authenticateToken, userController.getProfile);

// PUT /api/user/profile - Update current user profile
router.put('/profile', authenticateToken, userController.updateProfile);

// POST /api/user/career-guidance - AI career guidance & roadmap strategy
router.post('/career-guidance', authenticateToken, userController.getCareerGuidance);

export default router;
