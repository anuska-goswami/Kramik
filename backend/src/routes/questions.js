import express from 'express';
import * as questionController from '../controllers/question.controller.js';

const router = express.Router();

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);

export default router;
