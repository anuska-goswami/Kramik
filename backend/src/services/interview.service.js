import InterviewQuestion from '../models/InterviewQuestion.js';
import InterviewSession from '../models/InterviewSession.js';
import { evaluateInterviewAnswer, generateOverallInterviewSummary } from './ai.service.js';
import { ApiError } from '../utils/apiResponse.js';

/**
 * Fetch interview questions bank (technical and HR)
 */
export const getInterviewQuestions = async ({
  type,
  category,
  difficulty,
  search,
  page = 1,
  limit = 20
}) => {
  const filter = {};

  if (type) filter.type = type;
  if (difficulty) filter.difficulty = difficulty;
  if (category) filter.category = new RegExp(`^${category}$`, 'i');

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { title: searchRegex },
      { question: searchRegex },
      { category: searchRegex },
      { expectedKeyPoints: searchRegex }
    ];
  }

  const skip = (page - 1) * limit;

  const [questions, total] = await Promise.all([
    InterviewQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    InterviewQuestion.countDocuments(filter)
  ]);

  return {
    questions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Start a new mock interview session
 */
export const startInterviewSession = async (
  userId,
  {
    type = 'mixed',
    targetRole = 'Software Engineer',
    questionCount = 5,
    difficulty,
    category
  }
) => {
  const filter = {};

  if (type === 'technical' || type === 'hr') {
    filter.type = type;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  if (category && category.toLowerCase() !== 'all') {
    filter.category = new RegExp(`^${category}$`, 'i');
  }

  let candidates = await InterviewQuestion.find(filter).lean();

  if (candidates.length === 0) {
    delete filter.category;
    delete filter.difficulty;
    candidates = await InterviewQuestion.find(filter).lean();
  }

  if (candidates.length === 0) {
    candidates = await InterviewQuestion.find({}).lean();
  }

  if (candidates.length === 0) {
    throw new ApiError(400, 'No interview questions available to generate session. Please run seed script.');
  }

  // Shuffle candidate questions randomly
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

  const qaPairs = selected.map((q) => ({
    questionId: q._id,
    questionTitle: q.title,
    questionText: q.question,
    category: q.category,
    type: q.type,
    difficulty: q.difficulty,
    expectedKeyPoints: q.expectedKeyPoints || [],
    sampleAnswer: q.sampleAnswer || '',
    userAnswer: '',
    aiFeedback: {
      score: 0,
      strengths: [],
      improvements: [],
      missingKeyConcepts: [],
      improvedAnswer: ''
    }
  }));

  const sessionTitle = `${type.toUpperCase()} Mock Interview (${targetRole}) - ${new Date().toLocaleDateString()}`;

  const session = new InterviewSession({
    user: userId,
    title: sessionTitle,
    type,
    targetRole,
    status: 'in-progress',
    totalQuestions: qaPairs.length,
    answeredQuestions: 0,
    qaPairs,
    startedAt: new Date()
  });

  await session.save();
  return session;
};

/**
 * Submit answer to an interview question & get instant Gemini AI evaluation
 */
export const submitAnswer = async (sessionId, userId, questionIndex, userAnswer) => {
  const session = await InterviewSession.findOne({ _id: sessionId, user: userId });
  if (!session) {
    throw new ApiError(404, 'Interview session not found');
  }

  if (session.status === 'completed') {
    throw new ApiError(400, 'Cannot modify an already completed interview session');
  }

  if (questionIndex < 0 || questionIndex >= session.qaPairs.length) {
    throw new ApiError(400, `Invalid question index: ${questionIndex}`);
  }

  const targetQA = session.qaPairs[questionIndex];

  // AI evaluation via Gemini with heuristic fallback
  const feedback = await evaluateInterviewAnswer({
    questionTitle: targetQA.questionTitle,
    questionText: targetQA.questionText,
    category: targetQA.category,
    type: targetQA.type,
    expectedKeyPoints: targetQA.expectedKeyPoints,
    sampleAnswer: targetQA.sampleAnswer,
    userAnswer
  });

  targetQA.userAnswer = userAnswer;
  targetQA.aiFeedback = feedback;
  targetQA.submittedAt = new Date();

  // Recalculate answered questions count
  session.answeredQuestions = session.qaPairs.filter(
    (q) => q.userAnswer && q.userAnswer.trim().length > 0
  ).length;

  await session.save();

  return {
    sessionId: session._id,
    questionIndex,
    qaPair: targetQA,
    answeredQuestions: session.answeredQuestions,
    totalQuestions: session.totalQuestions
  };
};

/**
 * Finalize an interview session, compute overall score, score breakdown & weak topics
 */
export const completeInterviewSession = async (sessionId, userId) => {
  const session = await InterviewSession.findOne({ _id: sessionId, user: userId });
  if (!session) {
    throw new ApiError(404, 'Interview session not found');
  }

  if (session.status === 'completed') {
    return session;
  }

  const summary = await generateOverallInterviewSummary({
    targetRole: session.targetRole,
    type: session.type,
    qaPairs: session.qaPairs
  });

  session.overallScore = summary.overallScore;
  session.scoreBreakdown = summary.scoreBreakdown;
  session.aiOverallFeedback = {
    summary: summary.summary,
    topStrengths: summary.topStrengths,
    keyImprovements: summary.keyImprovements
  };
  session.weakTopics = summary.weakTopics;
  session.status = 'completed';
  session.completedAt = new Date();

  await session.save();
  return session;
};

/**
 * Fetch interview history for authenticated user
 */
export const getInterviewHistory = async (userId, { type, page = 1, limit = 20 }) => {
  const filter = { user: userId };
  if (type) filter.type = type;

  const skip = (page - 1) * limit;

  const [sessions, total] = await Promise.all([
    InterviewSession.find(filter)
      .select('title type targetRole status totalQuestions answeredQuestions overallScore scoreBreakdown startedAt completedAt weakTopics')
      .sort({ startedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    InterviewSession.countDocuments(filter)
  ]);

  return {
    sessions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get detailed single interview session
 */
export const getInterviewSessionById = async (sessionId, userId) => {
  const session = await InterviewSession.findOne({ _id: sessionId, user: userId }).lean();
  if (!session) {
    throw new ApiError(404, 'Interview session not found');
  }
  return session;
};

/**
 * Get aggregated weak topic analytics across all completed sessions for user
 */
export const getWeakTopicsAnalytics = async (userId) => {
  const completedSessions = await InterviewSession.find({
    user: userId,
    status: 'completed'
  }).lean();

  if (completedSessions.length === 0) {
    return {
      totalSessionsCompleted: 0,
      overallAverageScore: 0,
      weakTopics: [],
      topTopics: []
    };
  }

  const topicScores = {};

  completedSessions.forEach((session) => {
    (session.qaPairs || []).forEach((qa) => {
      const topic = qa.category || 'General';
      const score = qa.aiFeedback ? qa.aiFeedback.score : 0;
      if (!topicScores[topic]) {
        topicScores[topic] = { totalScore: 0, count: 0 };
      }
      topicScores[topic].totalScore += score;
      topicScores[topic].count += 1;
    });
  });

  const weakTopics = [];
  const topTopics = [];
  let totalAllScores = 0;
  let totalAllQuestions = 0;

  Object.keys(topicScores).forEach((topic) => {
    const stat = topicScores[topic];
    const avgScore = Math.round(stat.totalScore / stat.count);
    totalAllScores += stat.totalScore;
    totalAllQuestions += stat.count;

    const item = {
      topic,
      averageScore: avgScore,
      questionCount: stat.count,
      recommendation: avgScore < 70
        ? `Needs practice: Average score is ${avgScore}%. Revise key concepts and attempt more mock questions in ${topic}.`
        : `Strong performance: Average score is ${avgScore}%. Keep maintaining accuracy.`
    };

    if (avgScore < 70) {
      weakTopics.push(item);
    } else {
      topTopics.push(item);
    }
  });

  weakTopics.sort((a, b) => a.averageScore - b.averageScore);
  topTopics.sort((a, b) => b.averageScore - a.averageScore);

  const overallAverageScore = totalAllQuestions > 0
    ? Math.round(totalAllScores / totalAllQuestions)
    : 0;

  return {
    totalSessionsCompleted: completedSessions.length,
    overallAverageScore,
    weakTopics,
    topTopics
  };
};

/**
 * Delete an interview session from history
 */
export const deleteInterviewSession = async (sessionId, userId) => {
  const deleted = await InterviewSession.findOneAndDelete({ _id: sessionId, user: userId });
  if (!deleted) {
    throw new ApiError(404, 'Interview session not found or already deleted');
  }
  return { message: 'Interview session deleted successfully', sessionId };
};
