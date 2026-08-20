import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';
import { ApiError } from '../utils/apiResponse.js';

export const markQuestionSolved = async (userId, questionId) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ApiError(404, 'Question not found');
  }

  let progress = await UserProgress.findOne({ user: userId });
  if (!progress) {
    progress = new UserProgress({
      user: userId,
      solvedQuestions: []
    });
  }

  if (!progress.solvedQuestions.includes(questionId)) {
    progress.solvedQuestions.push(questionId);
    progress.lastStudied = new Date();
    await progress.save();
  }

  return {
    message: 'Question marked as solved successfully',
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
      lastStudied: null
    };
  }

  return progress;
};
