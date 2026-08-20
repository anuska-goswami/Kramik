import { asyncHandler } from '../utils/asyncHandler.js';
import * as mockTestService from '../services/mockTest.service.js';

export const getPresets = asyncHandler(async (req, res) => {
  const presets = await mockTestService.getMockTestPresets();
  res.status(200).json(presets);
});

export const generateTest = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const attempt = await mockTestService.generateMockTest(userId, req.body);
  res.status(201).json(attempt);
});

export const startTest = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { attemptId } = req.params;
  const attempt = await mockTestService.startMockTest(attemptId, userId);
  res.status(200).json(attempt);
});

export const getAttempt = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { attemptId } = req.params;
  const attempt = await mockTestService.getMockTestAttempt(attemptId, userId);
  res.status(200).json(attempt);
});

export const submitTest = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { attemptId } = req.params;
  const { answers } = req.body;
  const result = await mockTestService.submitMockTest(attemptId, userId, answers);
  res.status(200).json(result);
});

export const getHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const history = await mockTestService.getUserTestHistory(userId, req.query);
  res.status(200).json(history);
});

export const getPerformanceAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const analytics = await mockTestService.getUserPerformanceAnalytics(userId);
  res.status(200).json(analytics);
});

export const getSubjectReports = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const reports = await mockTestService.getSubjectReports(userId);
  res.status(200).json(reports);
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await mockTestService.getLeaderboard(req.query);
  res.status(200).json(leaderboard);
});
