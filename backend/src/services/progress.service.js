import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';
import { ApiError } from '../utils/apiResponse.js';

export const markQuestionSolved = async (userId, questionId, isCorrect = true) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ApiError(404, 'Question not found');
  }

  let progress = await UserProgress.findOne({ user: userId });
  if (!progress) {
    progress = new UserProgress({
      user: userId,
      solvedQuestions: [],
      attemptsLog: [],
      totalAttempts: 0,
      correctAttempts: 0
    });
  }

  const now = new Date();
  progress.totalAttempts += 1;
  if (isCorrect) {
    progress.correctAttempts += 1;
    if (!progress.solvedQuestions.includes(questionId)) {
      progress.solvedQuestions.push(questionId);
    }
  }

  progress.attemptsLog.push({
    question: questionId,
    isCorrect,
    attemptedAt: now
  });

  progress.lastStudied = now;
  await progress.save();

  return {
    message: isCorrect ? 'Question marked as solved successfully' : 'Attempt recorded',
    solvedQuestions: progress.solvedQuestions
  };
};

export const getUserProgressSummary = async (userId) => {
  const progress = await UserProgress.findOne({ user: userId })
    .populate('solvedQuestions', '_id title subjectId topicId difficulty')
    .lean();

  if (!progress) {
    return {
      solvedQuestions: [],
      totalAttempts: 0,
      correctAttempts: 0,
      lastStudied: null
    };
  }

  return progress;
};
