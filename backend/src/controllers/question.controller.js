import { asyncHandler } from '../utils/asyncHandler.js';
import * as questionService from '../services/question.service.js';
import * as aiService from '../services/ai.service.js';
import { ApiError } from '../utils/apiResponse.js';

export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await questionService.getQuestions(req.query);
  res.status(200).json(questions);
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await questionService.getQuestionById(req.params.id);
  res.status(200).json(question);
});

export const getQuestionAiExplanation = asyncHandler(async (req, res) => {
  const question = await questionService.getQuestionById(req.params.id);
  if (!question) {
    throw new ApiError(404, 'Question not found');
  }
  const explanation = await aiService.generateAiQuestionExplanation({
    questionTitle: question.title,
    description: question.description,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    difficulty: question.difficulty,
    subjectId: question.subjectId
  });
  res.status(200).json(explanation);
});
