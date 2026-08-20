import express from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/dashboard/stats - Complete consolidated dashboard metrics
router.get('/stats', authenticateToken, dashboardController.getDashboardOverview);

// GET /api/dashboard/progress - Progress breakdown by overall & subjects
router.get('/progress', authenticateToken, dashboardController.getDashboardProgress);

// GET /api/dashboard/activity - Streak and weekly activity timeline
router.get('/activity', authenticateToken, dashboardController.getDashboardActivity);

// GET /api/dashboard/readiness - Placement readiness score & components
router.get('/readiness', authenticateToken, dashboardController.getPlacementReadiness);

export default router;
