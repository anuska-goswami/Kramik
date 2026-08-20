import express from 'express';
import * as questionController from '../controllers/question.controller.js';

const router = express.Router();

// GET /api/questions - Fetch list of questions
router.get('/', questionController.getAllQuestions);

// GET /api/questions/:id/ai-explanation - AI powered explanation for question
router.get('/:id/ai-explanation', questionController.getQuestionAiExplanation);

// GET /api/questions/:id - Fetch question by ID
router.get('/:id', questionController.getQuestionById);

export default router;
