import { asyncHandler } from '../utils/asyncHandler.js';
import * as questionService from '../services/question.service.js';

export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await questionService.getQuestions(req.query);
  res.status(200).json(questions);
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await questionService.getQuestionById(req.params.id);
  res.status(200).json(question);
});
