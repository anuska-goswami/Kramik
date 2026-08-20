import { asyncHandler } from '../utils/asyncHandler.js';
import * as roadmapService from '../services/roadmap.service.js';

export const createGoal = asyncHandler(async (req, res) => {
  const result = await roadmapService.createGoal(req.user.id, req.body);
  res.status(201).json(result);
});

export const getUserGoals = asyncHandler(async (req, res) => {
  const goals = await roadmapService.getUserGoals(req.user.id);
  res.status(200).json(goals);
});

export const getGoalById = asyncHandler(async (req, res) => {
  const goal = await roadmapService.getGoalById(req.user.id, req.params.id);
  res.status(200).json(goal);
});

export const updateGoal = asyncHandler(async (req, res) => {
  const result = await roadmapService.updateGoal(req.user.id, req.params.id, req.body);
  res.status(200).json(result);
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const result = await roadmapService.deleteGoal(req.user.id, req.params.id);
  res.status(200).json(result);
});

export const toggleTask = asyncHandler(async (req, res) => {
  const result = await roadmapService.toggleTaskCompletion(req.user.id, req.params.goalId, req.params.taskId);
  res.status(200).json(result);
});

export const getRoadmapSummary = asyncHandler(async (req, res) => {
  const summary = await roadmapService.getRoadmapSummary(req.user.id);
  res.status(200).json(summary);
});
