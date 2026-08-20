import { asyncHandler } from '../utils/asyncHandler.js';
import * as aiService from '../services/ai.service.js';
import * as dashboardService from '../services/dashboard.service.js';
import * as mockTestService from '../services/mockTest.service.js';
import Question from '../models/Question.js';

/**
 * POST /api/ai/personalized-roadmap
 */
export const generatePersonalizedRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await aiService.generateAiPersonalizedRoadmap(req.body);
  res.status(200).json(roadmap);
});

/**
 * POST /api/ai/resume/generate
 */
export const generateResumeContent = asyncHandler(async (req, res) => {
  const { type = 'summary', ...params } = req.body;
  if (type === 'bullets') {
    const bullets = await aiService.generateAiBulletPoints(params);
    return res.status(200).json({ bullets });
  } else if (type === 'full') {
    const fullResume = await aiService.generateFullAiResume(params);
    return res.status(200).json(fullResume);
  } else {
    const summaries = await aiService.generateAiSummary(params);
    return res.status(200).json({ summaries });
  }
});

/**
 * POST /api/ai/resume/review
 */
export const reviewResume = asyncHandler(async (req, res) => {
  const review = await aiService.reviewAiResume(req.body.resumeData || req.body);
  res.status(200).json(review);
});

/**
 * POST /api/ai/interview/feedback
 */
export const evaluateInterviewAnswer = asyncHandler(async (req, res) => {
  const feedback = await aiService.evaluateInterviewAnswer(req.body);
  res.status(200).json(feedback);
});

/**
 * POST /api/ai/interview/summary
 */
export const generateInterviewSummary = asyncHandler(async (req, res) => {
  const summary = await aiService.generateOverallInterviewSummary(req.body);
  res.status(200).json(summary);
});

/**
 * POST /api/ai/question-explanation
 */
export const getQuestionExplanation = asyncHandler(async (req, res) => {
  let payload = req.body;
  if (req.body.questionId) {
    const q = await Question.findById(req.body.questionId).lean();
    if (q) {
      payload = {
        questionTitle: q.title,
        description: q.description,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        subjectId: q.subjectId
      };
    }
  }
  const explanation = await aiService.generateAiQuestionExplanation(payload);
  res.status(200).json(explanation);
});

/**
 * GET /api/ai/study-recommendations
 */
export const getStudyRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const metrics = await dashboardService.getDashboardMetrics(userId);
  const subjectReports = await mockTestService.getSubjectReports(userId);

  const weakTopics = [];
  subjectReports.forEach((sr) => {
    (sr.weakTopics || []).forEach((wt) => {
      weakTopics.push({ subjectId: sr.subjectId, topic: wt.topicId, count: wt.incorrectCount });
    });
  });

  const recommendations = await aiService.generateAiStudyRecommendations({
    userProgress: metrics,
    weakTopics
  });
  res.status(200).json(recommendations);
});

/**
 * GET /api/ai/daily-suggestions
 */
export const getDailySuggestions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const metrics = await dashboardService.getDashboardMetrics(userId);

  const suggestions = await aiService.generateAiDailyLearningSuggestions({
    streakCount: metrics.dailyStreak?.currentStreak || 1,
    solvedCount: metrics.questionsSolved?.totalSolved || 0,
    preferredSubject: metrics.continueLearning?.subjectName || 'Computer Networks'
  });
  res.status(200).json(suggestions);
});

/**
 * POST /api/ai/career-guidance
 */
export const getCareerGuidance = asyncHandler(async (req, res) => {
  const guidance = await aiService.generateAiCareerGuidance(req.body);
  res.status(200).json(guidance);
});
