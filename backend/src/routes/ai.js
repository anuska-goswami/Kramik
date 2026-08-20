import express from 'express';
import * as aiController from '../controllers/ai.controller.js';
import { authenticateToken, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  personalizedRoadmapValidation,
  resumeGenerateValidation,
  resumeReviewValidation,
  interviewAnswerValidation,
  questionExplanationValidation,
  careerGuidanceValidation
} from '../validators/ai.validator.js';

const router = express.Router();

// 1. Personalized Study Roadmap
router.post('/personalized-roadmap', optionalAuthenticate, personalizedRoadmapValidation, validate, aiController.generatePersonalizedRoadmap);

// 2. Resume Content Generation (Summary, Bullet Points, Full Resume)
router.post('/resume/generate', optionalAuthenticate, resumeGenerateValidation, validate, aiController.generateResumeContent);

// 3. Resume ATS Review
router.post('/resume/review', optionalAuthenticate, resumeReviewValidation, validate, aiController.reviewResume);

// 4. Interview Feedback & Overall Summary
router.post('/interview/feedback', optionalAuthenticate, interviewAnswerValidation, validate, aiController.evaluateInterviewAnswer);
router.post('/interview/summary', optionalAuthenticate, aiController.generateInterviewSummary);

// 5. Question Explanations
router.post('/question-explanation', optionalAuthenticate, questionExplanationValidation, validate, aiController.getQuestionExplanation);

// 6. Study Recommendations
router.get('/study-recommendations', authenticateToken, aiController.getStudyRecommendations);

// 7. Daily Learning Suggestions
router.get('/daily-suggestions', authenticateToken, aiController.getDailySuggestions);

// 8. Career Guidance
router.post('/career-guidance', optionalAuthenticate, careerGuidanceValidation, validate, aiController.getCareerGuidance);

export default router;
