import express from 'express';
import * as mockTestController from '../controllers/mockTest.controller.js';
import { authenticateToken, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  generateTestValidation,
  submitTestValidation,
  attemptIdParamValidation,
  leaderboardValidation,
  historyQueryValidation
} from '../validators/mockTest.validator.js';

const router = express.Router();

// GET /api/mock-tests/presets - Get pre-defined mock test templates
router.get('/presets', optionalAuthenticate, mockTestController.getPresets);

// POST /api/mock-tests/generate - Generate a new mock test
router.post('/generate', authenticateToken, generateTestValidation, validate, mockTestController.generateTest);

// POST /api/mock-tests/:attemptId/start - Start/initialize an attempt timer
router.post('/:attemptId/start', authenticateToken, attemptIdParamValidation, validate, mockTestController.startTest);

// GET /api/mock-tests/history - Get user's test attempt history
router.get('/history', authenticateToken, historyQueryValidation, validate, mockTestController.getHistory);

// GET /api/mock-tests/analytics/performance - Get overall user performance analytics
router.get('/analytics/performance', authenticateToken, mockTestController.getPerformanceAnalytics);

// GET /api/mock-tests/analytics/subject-reports - Get subject-wise report breakdown
router.get('/analytics/subject-reports', authenticateToken, mockTestController.getSubjectReports);

// GET /api/mock-tests/leaderboard - Global and subject-wise leaderboard rankings
router.get('/leaderboard', optionalAuthenticate, leaderboardValidation, validate, mockTestController.getLeaderboard);

// GET /api/mock-tests/:attemptId - Get test attempt details (Hides answers if in-progress)
router.get('/:attemptId', authenticateToken, attemptIdParamValidation, validate, mockTestController.getAttempt);

// POST /api/mock-tests/:attemptId/submit - Submit answers & auto-evaluate mock test
router.post('/:attemptId/submit', authenticateToken, submitTestValidation, validate, mockTestController.submitTest);

export default router;
