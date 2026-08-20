import express from 'express';
import * as roadmapController from '../controllers/roadmap.controller.js';
import { authenticateToken, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createGoalValidation, updateGoalValidation } from '../validators/roadmap.validator.js';

const router = express.Router();

// GET /api/roadmap/summary - Get overall roadmap progress summary & today's pending tasks
router.get('/summary', authenticateToken, roadmapController.getRoadmapSummary);

// POST /api/roadmap/ai-generate - Generate personalized AI study roadmap
router.post('/ai-generate', optionalAuthenticate, roadmapController.generateAiRoadmap);

// GET /api/roadmap/goals - Get all goals for authenticated user
router.get('/goals', authenticateToken, roadmapController.getUserGoals);

// POST /api/roadmap/goals - Create a new goal with auto-divided daily tasks
router.post('/goals', authenticateToken, createGoalValidation, validate, roadmapController.createGoal);

// GET /api/roadmap/goals/:id - Get detailed goal by ID
router.get('/goals/:id', authenticateToken, roadmapController.getGoalById);

// PUT /api/roadmap/goals/:id - Update goal details
router.put('/goals/:id', authenticateToken, updateGoalValidation, validate, roadmapController.updateGoal);

// DELETE /api/roadmap/goals/:id - Delete a goal
router.delete('/goals/:id', authenticateToken, roadmapController.deleteGoal);

// PATCH /api/roadmap/goals/:goalId/tasks/:taskId/toggle - Toggle daily task completion status
router.patch('/goals/:goalId/tasks/:taskId/toggle', authenticateToken, roadmapController.toggleTask);

export default router;
