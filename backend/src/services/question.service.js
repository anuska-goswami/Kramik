import Question from '../models/Question.js';
import { ApiError } from '../utils/apiResponse.js';

export const getQuestions = async ({ subjectId, topicId, difficulty }) => {
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
  return questions;
};

export const getQuestionById = async (id) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new ApiError(404, 'Question not found');
  }
  return question;
};
