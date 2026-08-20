import { asyncHandler } from '../utils/asyncHandler.js';
import * as dashboardService from '../services/dashboard.service.js';

export const getDashboardOverview = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getDashboardMetrics(req.user.id);
  res.status(200).json(metrics);
});

export const getDashboardProgress = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getDashboardMetrics(req.user.id);
  res.status(200).json({
    overallProgress: metrics.overallProgress,
    subjectProgress: metrics.subjectProgress,
    questionsSolved: metrics.questionsSolved
  });
});

export const getDashboardActivity = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getDashboardMetrics(req.user.id);
  res.status(200).json({
    dailyStreak: metrics.dailyStreak,
    weeklyActivity: metrics.weeklyActivity,
    recentlyPracticedTopics: metrics.recentlyPracticedTopics
  });
});

export const getPlacementReadiness = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getDashboardMetrics(req.user.id);
  res.status(200).json(metrics.placementReadiness);
});
