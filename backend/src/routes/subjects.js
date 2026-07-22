import express from 'express';
import jwt from 'jsonwebtoken';
import Subject from '../models/Subject.js';
import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';

const router = express.Router();

// Helper middleware to optionally authenticate the user
// (Allows guest users to see subjects, but authenticated users get their progress metrics)
async function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey', (err, decoded) => {
    if (!err) {
      req.user = decoded;
    }
    next();
  });
}

// GET /api/subjects - Get all subjects (with optional user progress)
router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const subjects = await Subject.find().lean();
    
    let userProgress = null;
    if (req.user) {
      userProgress = await UserProgress.findOne({ user: req.user.id });
    }

    const solvedQuestionIds = userProgress ? userProgress.solvedQuestions.map(id => id.toString()) : [];

    // For each subject, merge stats
    const subjectsWithStats = await Promise.all(subjects.map(async (subject) => {
      // Find all questions belonging to this subject
      const questions = await Question.find({ subjectId: subject.id }).select('_id topicId').lean();
      const totalQuestions = questions.length;
      
      // Calculate how many of these questions the user has solved
      const solvedQuestionsInSubject = questions.filter(q => solvedQuestionIds.includes(q._id.toString()));
      const questionsSolvedCount = solvedQuestionsInSubject.length;

      // Calculate completed topics
      // A topic is considered "Completed" if all its questions are solved (or if at least one is solved, depending on preference)
      // Let's count how many distinct topicIds have at least one solved question
      const solvedTopicIds = new Set(solvedQuestionsInSubject.map(q => q.topicId));
      const completedTopicsCount = solvedTopicIds.size;

      // Count total topics
      let totalTopicsCount = 0;
      subject.chapters.forEach(chapter => {
        totalTopicsCount += chapter.topics.length;
      });

      // Calculate progress percentage
      const progressPercent = totalQuestions > 0 
        ? Math.round((questionsSolvedCount / totalQuestions) * 100) 
        : 0;

      // Update topic status inside chapters based on user progress
      const updatedChapters = subject.chapters.map(chapter => {
        const updatedTopics = chapter.topics.map(topic => {
          // Check if this topic's questions are solved
          const topicQuestions = questions.filter(q => q.topicId === topic.id);
          const topicQuestionsCount = topicQuestions.length;
          const solvedTopicQuestions = topicQuestions.filter(q => solvedQuestionIds.includes(q._id.toString()));
          
          let status = 'Available';
          if (topicQuestionsCount > 0 && solvedTopicQuestions.length === topicQuestionsCount) {
            status = 'Completed';
          } else if (solvedTopicQuestions.length > 0) {
            status = 'In Progress';
          }

          return {
            ...topic,
            status
          };
        });

        // Determine if chapter is locked (for simplicity, first chapter is unlocked, others locked if previous not completed)
        // Or just map direct from DB
        return {
          ...chapter,
          topics: updatedTopics
        };
      });

      return {
        id: subject.id,
        name: subject.name,
        description: subject.description,
        progress: progressPercent,
        completedTopics: completedTopicsCount,
        totalTopics: totalTopicsCount,
        questionsSolved: questionsSolvedCount,
        accuracy: 80, // Mock accuracy for now, or calculate if we track correct/incorrect attempts later
        lastStudied: userProgress ? 'Recent' : 'Not started',
        chapters: updatedChapters
      };
    }));

    res.json(subjectsWithStats);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/subjects/:id - Get detailed subject by ID (e.g. 'cn')
router.get('/:id', optionalAuthenticate, async (req, res) => {
  try {
    const subject = await Subject.findOne({ id: req.params.id }).lean();
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    let userProgress = null;
    if (req.user) {
      userProgress = await UserProgress.findOne({ user: req.user.id });
    }

    const solvedQuestionIds = userProgress ? userProgress.solvedQuestions.map(id => id.toString()) : [];
    const questions = await Question.find({ subjectId: subject.id }).select('_id topicId').lean();

    // Map status for each topic
    const updatedChapters = subject.chapters.map(chapter => {
      const updatedTopics = chapter.topics.map(topic => {
        const topicQuestions = questions.filter(q => q.topicId === topic.id);
        const topicQuestionsCount = topicQuestions.length;
        const solvedTopicQuestions = topicQuestions.filter(q => solvedQuestionIds.includes(q._id.toString()));
        
        let status = 'Available';
        if (topicQuestionsCount > 0 && solvedTopicQuestions.length === topicQuestionsCount) {
          status = 'Completed';
        } else if (solvedTopicQuestions.length > 0) {
          status = 'In Progress';
        }

        return {
          ...topic,
          status
        };
      });

      return {
        ...chapter,
        topics: updatedTopics
      };
    });

    res.json({
      ...subject,
      chapters: updatedChapters
    });
  } catch (error) {
    console.error('Error fetching subject detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
