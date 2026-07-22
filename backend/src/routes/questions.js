import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// GET /api/questions - Get list of questions (filtered by subjectId, topicId, difficulty)
router.get('/', async (req, res) => {
  try {
    const { subjectId, topicId, difficulty } = req.query;
    const filter = {};

    if (subjectId) {
      filter.subjectId = subjectId;
    }
    if (topicId) {
      filter.topicId = topicId;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.find(filter).lean();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/questions/:id - Get a single question's details
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching question details:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid question ID format' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
