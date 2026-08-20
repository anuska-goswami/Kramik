import express from 'express';
import * as interviewController from '../controllers/interview.controller.js';
import { authenticateToken, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getQuestionsValidation,
  startInterviewValidation,
  submitAnswerValidation,
  sessionIdParamValidation
} from '../validators/interview.validator.js';

const router = express.Router();

// GET /api/interviews/questions - Get technical & HR question bank
router.get('/questions', optionalAuthenticate, getQuestionsValidation, validate, interviewController.getQuestions);

// POST /api/interviews/start - Start a new mock interview session
router.post('/start', authenticateToken, startInterviewValidation, validate, interviewController.startSession);

// POST /api/interviews/:sessionId/submit-answer - Submit answer & get Gemini AI feedback
router.post('/:sessionId/submit-answer', authenticateToken, submitAnswerValidation, validate, interviewController.submitAnswer);

// POST /api/interviews/:sessionId/complete - Complete session, calculate score & weak topics
router.post('/:sessionId/complete', authenticateToken, sessionIdParamValidation, validate, interviewController.completeSession);

// GET /api/interviews/history - Get user's past interview sessions
router.get('/history', authenticateToken, interviewController.getHistory);

// GET /api/interviews/analytics/weak-topics - Get aggregated weak topic analysis
router.get('/analytics/weak-topics', authenticateToken, interviewController.getWeakTopicsAnalytics);

// GET /api/interviews/:sessionId - Get detailed interview session report
router.get('/:sessionId', authenticateToken, sessionIdParamValidation, validate, interviewController.getSessionById);

// DELETE /api/interviews/:sessionId - Delete an interview session from history
router.delete('/:sessionId', authenticateToken, sessionIdParamValidation, validate, interviewController.deleteSession);

export default router;
