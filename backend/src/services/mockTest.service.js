import MockTestPreset from '../models/MockTestPreset.js';
import MockTestAttempt from '../models/MockTestAttempt.js';
import Question from '../models/Question.js';
import Subject from '../models/Subject.js';
import UserProgress from '../models/UserProgress.js';
import { ApiError } from '../utils/apiResponse.js';

/**
 * Get pre-defined mock test presets
 */
export const getMockTestPresets = async () => {
  const presets = await MockTestPreset.find()
    .sort({ isFeatured: -1, createdAt: -1 })
    .lean();
  return presets;
};

/**
 * Generate & initialize a new Mock Test Attempt
 * Uses optimized MongoDB $sample aggregation for random question selection.
 */
export const generateMockTest = async (
  userId,
  {
    presetSlug,
    subjectIds,
    totalQuestions = 20,
    timeLimitMinutes = 30,
    difficulty = 'Mixed',
    title
  }
) => {
  let targetSubjectIds = [];
  let testTitle = title;
  let duration = timeLimitMinutes;
  let qCount = totalQuestions;
  let diff = difficulty;

  // 1. If preset slug is provided, load parameters from preset
  if (presetSlug) {
    const preset = await MockTestPreset.findOne({ slug: presetSlug.toLowerCase() }).lean();
    if (!preset) {
      throw new ApiError(404, `Mock test preset '${presetSlug}' not found`);
    }
    testTitle = preset.title;
    targetSubjectIds = preset.subjectIds;
    duration = preset.timeLimitMinutes;
    qCount = preset.totalQuestions;
    diff = preset.difficulty;
  } else {
    // Standard custom test setup
    if (typeof subjectIds === 'string') {
      targetSubjectIds = [subjectIds];
    } else if (Array.isArray(subjectIds)) {
      targetSubjectIds = subjectIds;
    }
  }

  // Handle 'all' subjects
  if (!targetSubjectIds || targetSubjectIds.length === 0 || targetSubjectIds.includes('all')) {
    const allSubjects = await Subject.find().select('id').lean();
    targetSubjectIds = allSubjects.map((s) => s.id);
  }

  // 2. Query questions from database using MongoDB $sample for optimized random sampling
  const matchStage = {};
  if (targetSubjectIds && targetSubjectIds.length > 0) {
    matchStage.subjectId = { $in: targetSubjectIds };
  }
  if (diff && diff !== 'Mixed') {
    matchStage.difficulty = diff;
  }

  let selectedQuestions = await Question.aggregate([
    { $match: matchStage },
    { $sample: { size: qCount } }
  ]);

  // Fallback 1: If difficulty match returns fewer questions than requested, drop difficulty constraint
  if (selectedQuestions.length < qCount && matchStage.difficulty) {
    delete matchStage.difficulty;
    selectedQuestions = await Question.aggregate([
      { $match: matchStage },
      { $sample: { size: qCount } }
    ]);
  }

  // Fallback 2: If subject filter yields 0 questions, pick from global question pool
  if (selectedQuestions.length === 0) {
    selectedQuestions = await Question.aggregate([
      { $sample: { size: qCount } }
    ]);
  }

  if (selectedQuestions.length === 0) {
    throw new ApiError(400, 'No questions available in database to generate mock test.');
  }

  // 3. Build question snapshots
  const snapshots = selectedQuestions.map((q) => ({
    questionId: q._id,
    title: q.title,
    description: q.description,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || '',
    subjectId: q.subjectId,
    topicId: q.topicId || '',
    difficulty: q.difficulty,
    selectedOption: null,
    status: 'unanswered',
    isCorrect: false,
    timeTakenSeconds: 0
  }));

  const expiresAt = new Date(Date.now() + duration * 60 * 1000);
  const finalTitle = testTitle || `Mock Test (${selectedQuestions.length} Questions)`;

  const attempt = new MockTestAttempt({
    user: userId,
    title: finalTitle,
    subjectIds: targetSubjectIds,
    totalQuestions: snapshots.length,
    timeLimitMinutes: duration,
    status: 'in-progress',
    startedAt: new Date(),
    expiresAt,
    questions: snapshots
  });

  await attempt.save();

  // Strip answer key for client payload
  const clientPayload = attempt.toObject();
  clientPayload.questions = clientPayload.questions.map((q) => {
    const { correctAnswer, explanation, ...safeQuestion } = q;
    return safeQuestion;
  });

  return clientPayload;
};

/**
 * Start or transition a Mock Test Attempt to 'in-progress'
 */
export const startMockTest = async (attemptId, userId) => {
  const attempt = await MockTestAttempt.findOne({ _id: attemptId, user: userId });
  if (!attempt) {
    throw new ApiError(404, 'Mock test attempt not found');
  }

  if (attempt.status === 'completed') {
    throw new ApiError(400, 'Mock test has already been completed');
  }

  const now = new Date();

  if (attempt.status === 'draft') {
    attempt.status = 'in-progress';
    attempt.startedAt = now;
    attempt.expiresAt = new Date(now.getTime() + attempt.timeLimitMinutes * 60 * 1000);
    await attempt.save();
  } else if (attempt.status === 'in-progress') {
    if (now > new Date(attempt.expiresAt)) {
      attempt.status = 'expired';
      await attempt.save();
      throw new ApiError(400, 'Mock test time limit has expired');
    }
  }

  const clientPayload = attempt.toObject();
  if (clientPayload.status === 'in-progress' || clientPayload.status === 'draft') {
    clientPayload.questions = clientPayload.questions.map((q) => {
      const { correctAnswer, explanation, ...safeQuestion } = q;
      return safeQuestion;
    });
  }

  return clientPayload;
};

/**
 * Fetch mock test attempt by ID (strips answers if still in-progress/draft)
 */
export const getMockTestAttempt = async (attemptId, userId) => {
  const attempt = await MockTestAttempt.findOne({ _id: attemptId, user: userId }).lean();
  if (!attempt) {
    throw new ApiError(404, 'Mock test attempt not found');
  }

  // Check auto-expiration
  if (attempt.status === 'in-progress' && new Date() > new Date(attempt.expiresAt)) {
    attempt.status = 'expired';
    await MockTestAttempt.updateOne({ _id: attemptId }, { status: 'expired' });
  }

  // Strip answers if test is not completed
  if (attempt.status === 'in-progress' || attempt.status === 'draft') {
    attempt.questions = attempt.questions.map((q) => {
      const { correctAnswer, explanation, ...safeQuestion } = q;
      return safeQuestion;
    });
  }

  return attempt;
};

/**
 * Auto-evaluate and submit mock test attempt
 */
export const submitMockTest = async (attemptId, userId, userAnswers = []) => {
  const attempt = await MockTestAttempt.findOne({ _id: attemptId, user: userId });
  if (!attempt) {
    throw new ApiError(404, 'Mock test attempt not found');
  }

  if (attempt.status === 'completed') {
    return attempt;
  }

  // Check if test expired prior to submission
  const now = new Date();
  if (attempt.status === 'in-progress' && now > new Date(attempt.expiresAt)) {
    attempt.status = 'expired';
  }

  // Fetch subject names mapping
  const subjects = await Subject.find().select('id name').lean();
  const subjectNameMap = {};
  subjects.forEach((s) => {
    subjectNameMap[s.id] = s.name;
  });

  // Build answer lookup map
  const answerMap = {};
  if (Array.isArray(userAnswers)) {
    userAnswers.forEach((ans) => {
      if (ans.questionId) {
        answerMap[ans.questionId.toString()] = ans;
      }
    });
  }

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let totalTimeTakenSeconds = 0;
  const subjectStats = {};

  // Evaluate each question snapshot
  attempt.questions.forEach((q) => {
    const snapshotIdStr = q._id ? q._id.toString() : '';
    const questionIdStr = q.questionId ? q.questionId.toString() : '';
    const userAns = answerMap[snapshotIdStr] || answerMap[questionIdStr] || {};
    const selectedOpt = userAns.selectedOption !== undefined ? userAns.selectedOption : null;
    const timeSpent = userAns.timeTakenSeconds || 0;

    q.selectedOption = selectedOpt;
    q.timeTakenSeconds = timeSpent;
    totalTimeTakenSeconds += timeSpent;

    const subId = q.subjectId || 'general';
    if (!subjectStats[subId]) {
      subjectStats[subId] = {
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0
      };
    }
    subjectStats[subId].total += 1;

    if (!selectedOpt || selectedOpt.toString().trim() === '') {
      q.status = 'unanswered';
      q.isCorrect = false;
      unansweredCount++;
      subjectStats[subId].unanswered += 1;
    } else {
      // Check correctness: exact match or index match
      const correctStr = String(q.correctAnswer).trim().toLowerCase();
      const selectedStr = String(selectedOpt).trim().toLowerCase();

      let isMatch = selectedStr === correctStr;

      // Handle index option matching (e.g. "0" matching first option string)
      if (!isMatch && q.options && q.options.length > 0) {
        const selectedIndex = parseInt(selectedStr, 10);
        if (!isNaN(selectedIndex) && q.options[selectedIndex]) {
          isMatch = q.options[selectedIndex].trim().toLowerCase() === correctStr;
        } else {
          const correctIndex = parseInt(correctStr, 10);
          if (!isNaN(correctIndex) && q.options[correctIndex]) {
            isMatch = q.options[correctIndex].trim().toLowerCase() === selectedStr;
          }
        }
      }

      if (isMatch) {
        q.status = 'correct';
        q.isCorrect = true;
        correctCount++;
        subjectStats[subId].correct += 1;
      } else {
        q.status = 'incorrect';
        q.isCorrect = false;
        incorrectCount++;
        subjectStats[subId].incorrect += 1;
      }
    }
  });

  const totalQ = attempt.questions.length;
  const score = correctCount; // 1 mark per correct answer
  const maxScore = totalQ;
  const percentage = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Build subject breakdown
  const subjectBreakdown = Object.keys(subjectStats).map((subId) => {
    const stat = subjectStats[subId];
    const subAttempted = stat.correct + stat.incorrect;
    const subAccuracy = subAttempted > 0 ? Math.round((stat.correct / subAttempted) * 100) : 0;

    return {
      subjectId: subId,
      subjectName: subjectNameMap[subId] || subId.toUpperCase(),
      totalQuestions: stat.total,
      correctCount: stat.correct,
      incorrectCount: stat.incorrect,
      unansweredCount: stat.unanswered,
      score: stat.correct,
      accuracy: subAccuracy
    };
  });

  if (attempt.status !== 'expired') {
    attempt.status = 'completed';
  }
  attempt.submittedAt = now;
  attempt.timeTakenSeconds = totalTimeTakenSeconds;
  attempt.score = score;
  attempt.maxScore = maxScore;
  attempt.percentage = percentage;
  attempt.accuracy = accuracy;
  attempt.correctAnswersCount = correctCount;
  attempt.incorrectAnswersCount = incorrectCount;
  attempt.unansweredCount = unansweredCount;
  attempt.subjectBreakdown = subjectBreakdown;

  await attempt.save();

  // Synchronize result with UserProgress
  try {
    let userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress) {
      userProgress = new UserProgress({
        user: userId,
        solvedQuestions: [],
        attemptsLog: [],
        totalAttempts: 0,
        correctAttempts: 0
      });
    }

    attempt.questions.forEach((q) => {
      if (q.questionId) {
        userProgress.totalAttempts += 1;
        if (q.isCorrect) {
          userProgress.correctAttempts += 1;
          const qIdStr = q.questionId.toString();
          if (!userProgress.solvedQuestions.some((id) => id.toString() === qIdStr)) {
            userProgress.solvedQuestions.push(q.questionId);
          }
        }
        userProgress.attemptsLog.push({
          question: q.questionId,
          isCorrect: q.isCorrect,
          attemptedAt: now
        });
      }
    });

    userProgress.lastStudied = now;
    await userProgress.save();
  } catch (err) {
    console.error('Failed to sync mock test attempt with UserProgress:', err);
  }

  return attempt;
};

/**
 * Fetch test history for a user
 */
export const getUserTestHistory = async (userId, { page = 1, limit = 20, status }) => {
  const skip = (page - 1) * limit;
  const filter = { user: userId };
  if (status) {
    filter.status = status;
  }

  const [attempts, total] = await Promise.all([
    MockTestAttempt.find(filter)
      .select('title subjectIds totalQuestions timeLimitMinutes status startedAt submittedAt percentage accuracy score maxScore timeTakenSeconds correctAnswersCount incorrectAnswersCount unansweredCount')
      .sort({ startedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    MockTestAttempt.countDocuments(filter)
  ]);

  return {
    attempts,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get overall performance analytics for a user
 */
export const getUserPerformanceAnalytics = async (userId) => {
  const completedAttempts = await MockTestAttempt.find({
    user: userId,
    status: 'completed'
  })
    .sort({ submittedAt: 1 })
    .lean();

  if (completedAttempts.length === 0) {
    return {
      totalTestsCompleted: 0,
      averagePercentage: 0,
      averageAccuracy: 0,
      bestPercentage: 0,
      totalQuestionsAttempted: 0,
      totalCorrect: 0,
      totalTimeSpentMinutes: 0,
      avgTimePerQuestionSeconds: 0,
      scoreTrend: [],
      difficultyBreakdown: {
        Easy: { total: 0, correct: 0, accuracy: 0 },
        Medium: { total: 0, correct: 0, accuracy: 0 },
        Hard: { total: 0, correct: 0, accuracy: 0 }
      }
    };
  }

  const totalPercentage = completedAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
  const totalAccuracy = completedAttempts.reduce((acc, curr) => acc + curr.accuracy, 0);
  const bestPercentage = Math.max(...completedAttempts.map((a) => a.percentage));
  const totalCorrect = completedAttempts.reduce((acc, curr) => acc + curr.correctAnswersCount, 0);
  const totalQuestionsAttempted = completedAttempts.reduce(
    (acc, curr) => acc + curr.correctAnswersCount + curr.incorrectAnswersCount,
    0
  );
  const totalTimeTakenSeconds = completedAttempts.reduce((acc, curr) => acc + curr.timeTakenSeconds, 0);
  const avgTimePerQuestionSeconds = totalQuestionsAttempted > 0
    ? Math.round(totalTimeTakenSeconds / totalQuestionsAttempted)
    : 0;

  const scoreTrend = completedAttempts.slice(-10).map((a) => ({
    attemptId: a._id,
    title: a.title,
    date: a.submittedAt,
    percentage: a.percentage,
    accuracy: a.accuracy,
    score: a.score,
    maxScore: a.maxScore
  }));

  // Aggregated difficulty breakdown across completed test attempts
  const diffStats = {
    Easy: { total: 0, correct: 0 },
    Medium: { total: 0, correct: 0 },
    Hard: { total: 0, correct: 0 }
  };

  completedAttempts.forEach((attempt) => {
    (attempt.questions || []).forEach((q) => {
      const diff = q.difficulty || 'Medium';
      if (diffStats[diff]) {
        if (q.status !== 'unanswered') {
          diffStats[diff].total += 1;
          if (q.isCorrect) {
            diffStats[diff].correct += 1;
          }
        }
      }
    });
  });

  const difficultyBreakdown = {};
  ['Easy', 'Medium', 'Hard'].forEach((level) => {
    const total = diffStats[level].total;
    const correct = diffStats[level].correct;
    difficultyBreakdown[level] = {
      total,
      correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  });

  return {
    totalTestsCompleted: completedAttempts.length,
    averagePercentage: Math.round(totalPercentage / completedAttempts.length),
    averageAccuracy: Math.round(totalAccuracy / completedAttempts.length),
    bestPercentage,
    totalQuestionsAttempted,
    totalCorrect,
    totalTimeSpentMinutes: Math.round(totalTimeTakenSeconds / 60),
    avgTimePerQuestionSeconds,
    scoreTrend,
    difficultyBreakdown
  };
};

/**
 * Get subject-wise performance breakdown report for a user
 */
export const getSubjectReports = async (userId) => {
  const completedAttempts = await MockTestAttempt.find({
    user: userId,
    status: 'completed'
  }).lean();

  if (completedAttempts.length === 0) {
    return [];
  }

  const subjectAgg = {};
  const topicErrorMap = {}; // subjectId -> { topicId -> incorrectCount }

  completedAttempts.forEach((attempt) => {
    (attempt.subjectBreakdown || []).forEach((sb) => {
      const subId = sb.subjectId;
      if (!subjectAgg[subId]) {
        subjectAgg[subId] = {
          subjectId: subId,
          subjectName: sb.subjectName,
          totalQuestions: 0,
          correctCount: 0,
          incorrectCount: 0,
          unansweredCount: 0,
          totalScore: 0
        };
      }
      subjectAgg[subId].totalQuestions += sb.totalQuestions;
      subjectAgg[subId].correctCount += sb.correctCount;
      subjectAgg[subId].incorrectCount += sb.incorrectCount;
      subjectAgg[subId].unansweredCount += sb.unansweredCount;
      subjectAgg[subId].totalScore += sb.score;
    });

    (attempt.questions || []).forEach((q) => {
      if (q.subjectId && q.topicId && q.status === 'incorrect') {
        if (!topicErrorMap[q.subjectId]) {
          topicErrorMap[q.subjectId] = {};
        }
        topicErrorMap[q.subjectId][q.topicId] = (topicErrorMap[q.subjectId][q.topicId] || 0) + 1;
      }
    });
  });

  const reports = Object.keys(subjectAgg).map((subId) => {
    const data = subjectAgg[subId];
    const attempted = data.correctCount + data.incorrectCount;
    const accuracy = attempted > 0 ? Math.round((data.correctCount / attempted) * 100) : 0;
    const overallPassPercentage = data.totalQuestions > 0 
      ? Math.round((data.correctCount / data.totalQuestions) * 100)
      : 0;

    // Identify top weak topics for this subject
    const errors = topicErrorMap[subId] || {};
    const weakTopics = Object.keys(errors)
      .map((topicId) => ({ topicId, incorrectCount: errors[topicId] }))
      .sort((a, b) => b.incorrectCount - a.incorrectCount)
      .slice(0, 3);

    return {
      subjectId: data.subjectId,
      subjectName: data.subjectName,
      totalQuestions: data.totalQuestions,
      attemptedCount: attempted,
      correctCount: data.correctCount,
      incorrectCount: data.incorrectCount,
      unansweredCount: data.unansweredCount,
      accuracy,
      overallPassPercentage,
      status: accuracy >= 70 ? 'Strong' : accuracy >= 50 ? 'Moderate' : 'Needs Improvement',
      weakTopics
    };
  });

  return reports;
};

/**
 * Get global & subject-wise leaderboard rankings
 */
export const getLeaderboard = async ({ subjectId, period = 'all-time', limit = 20 }) => {
  const match = { status: 'completed' };

  if (period === 'weekly') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    match.submittedAt = { $gte: weekAgo };
  } else if (period === 'monthly') {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    match.submittedAt = { $gte: monthAgo };
  }

  if (subjectId) {
    match.subjectIds = subjectId;
  }

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: '$user',
        totalTests: { $sum: 1 },
        totalScore: { $sum: '$score' },
        totalMaxScore: { $sum: '$maxScore' },
        avgPercentage: { $avg: '$percentage' },
        avgAccuracy: { $avg: '$accuracy' },
        totalTimeTakenSeconds: { $sum: '$timeTakenSeconds' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userInfo'
      }
    },
    { $unwind: '$userInfo' },
    {
      $project: {
        userId: '$_id',
        fullName: '$userInfo.fullName',
        email: '$userInfo.email',
        totalTests: 1,
        totalScore: 1,
        totalMaxScore: 1,
        avgPercentage: { $round: ['$avgPercentage', 1] },
        avgAccuracy: { $round: ['$avgAccuracy', 1] },
        totalTimeTakenSeconds: 1
      }
    },
    {
      $sort: {
        totalScore: -1,
        avgAccuracy: -1,
        totalTimeTakenSeconds: 1
      }
    },
    { $limit: limit }
  ];

  const leaderboard = await MockTestAttempt.aggregate(pipeline);

  const rankedLeaderboard = leaderboard.map((item, index) => ({
    rank: index + 1,
    ...item
  }));

  return rankedLeaderboard;
};
