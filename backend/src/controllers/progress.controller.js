import { asyncHandler } from '../utils/asyncHandler.js';
import * as progressService from '../services/progress.service.js';

export const markQuestionSolved = asyncHandler(async (req, res) => {
  const result = await progressService.markQuestionSolved(req.user.id, req.params.questionId);
  res.status(200).json(result);
});

export const getProgressSummary = asyncHandler(async (req, res) => {
  const result = await progressService.getUserProgressSummary(req.user.id);
  res.status(200).json(result);
});
