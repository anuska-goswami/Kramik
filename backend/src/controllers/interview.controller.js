import { asyncHandler } from '../utils/asyncHandler.js';
import * as interviewService from '../services/interview.service.js';

export const getQuestions = asyncHandler(async (req, res) => {
  const result = await interviewService.getInterviewQuestions(req.query);
  res.status(200).json(result);
});

export const startSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const session = await interviewService.startInterviewSession(userId, req.body);
  res.status(201).json(session);
});

export const submitAnswer = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  const { questionIndex, userAnswer } = req.body;
  const result = await interviewService.submitAnswer(sessionId, userId, questionIndex, userAnswer);
  res.status(200).json(result);
});

export const completeSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  const session = await interviewService.completeInterviewSession(sessionId, userId);
  res.status(200).json(session);
});

export const getHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await interviewService.getInterviewHistory(userId, req.query);
  res.status(200).json(result);
});

export const getSessionById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  const session = await interviewService.getInterviewSessionById(sessionId, userId);
  res.status(200).json(session);
});

export const getWeakTopicsAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const analytics = await interviewService.getWeakTopicsAnalytics(userId);
  res.status(200).json(analytics);
});

export const deleteSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  const result = await interviewService.deleteInterviewSession(sessionId, userId);
  res.status(200).json(result);
});
