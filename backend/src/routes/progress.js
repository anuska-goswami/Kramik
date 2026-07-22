import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';

const router = express.Router();

// POST /api/progress/solve/:questionId - Mark a question as solved
router.post('/solve/:questionId', authenticateToken, async (req, res) => {
  try {
    const { questionId } = req.params;
    const userId = req.user.id;

    // Validate if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Find or create UserProgress document
    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = new UserProgress({
        user: userId,
        solvedQuestions: []
      });
    }

    // Add question ID to solvedQuestions array if not already present
    if (!progress.solvedQuestions.includes(questionId)) {
      progress.solvedQuestions.push(questionId);
      progress.lastStudied = new Date();
      await progress.save();
    }

    res.json({
      message: 'Question marked as solved successfully',
      solvedQuestions: progress.solvedQuestions
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid question ID format' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/progress - Get current user progress summary
router.get('/', authenticateToken, async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ user: req.user.id })
      .populate('solvedQuestions', '_id title subjectId topicId difficulty')
      .lean();

    if (!progress) {
      return res.json({
        solvedQuestions: [],
        lastStudied: null
      });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
