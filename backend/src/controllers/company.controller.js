import { asyncHandler } from '../utils/asyncHandler.js';
import * as companyService from '../services/company.service.js';

export const getCompanies = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const result = await companyService.getCompanies({
    ...req.query,
    userId
  });
  res.status(200).json(result);
});

export const getCompanyDetails = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const company = await companyService.getCompanyBySlug(req.params.slug, userId);
  res.status(200).json(company);
});

export const getAptitudeQuestions = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const result = await companyService.getCompanyQuestions(
    req.params.slug,
    'aptitude',
    req.query,
    userId
  );
  res.status(200).json(result);
});

export const getInterviewQuestions = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const result = await companyService.getCompanyQuestions(
    req.params.slug,
    'interview',
    req.query,
    userId
  );
  res.status(200).json(result);
});

export const toggleBookmark = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await companyService.toggleCompanyBookmark(req.params.slug, userId);
  res.status(200).json(result);
});

export const getUserBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bookmarks = await companyService.getUserBookmarkedCompanies(userId);
  res.status(200).json(bookmarks);
});

export const recordAptitudeAttempt = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { questionId, isCorrect } = req.body;
  const result = await companyService.recordAptitudeAttempt(
    req.params.slug,
    userId,
    questionId,
    isCorrect
  );
  res.status(200).json(result);
});

export const toggleInterviewCompletion = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { questionId } = req.body;
  const result = await companyService.toggleInterviewCompletion(
    req.params.slug,
    userId,
    questionId
  );
  res.status(200).json(result);
});

export const getCompanyProgress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await companyService.getCompanyProgress(req.params.slug, userId);
  res.status(200).json(result);
});
