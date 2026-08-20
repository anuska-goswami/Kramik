import express from 'express';
import * as progressController from '../controllers/progress.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/solve/:questionId', authenticateToken, progressController.markQuestionSolved);
router.get('/', authenticateToken, progressController.getProgressSummary);

export default router;
