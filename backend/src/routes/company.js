import express from 'express';
import * as companyController from '../controllers/company.controller.js';
import { authenticateToken, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getCompaniesValidation,
  companySlugParamValidation,
  recordAptitudeAttemptValidation,
  toggleInterviewCompletionValidation
} from '../validators/company.validator.js';

const router = express.Router();

// GET /api/companies - List, search & filter companies
router.get('/', optionalAuthenticate, getCompaniesValidation, validate, companyController.getCompanies);

// GET /api/companies/bookmarks - List all bookmarked companies for logged in user
router.get('/bookmarks', authenticateToken, companyController.getUserBookmarks);

// GET /api/companies/:slug - Get company profile & overview
router.get('/:slug', optionalAuthenticate, companySlugParamValidation, validate, companyController.getCompanyDetails);

// GET /api/companies/:slug/aptitude - Get company-wise aptitude questions
router.get('/:slug/aptitude', optionalAuthenticate, companySlugParamValidation, validate, companyController.getAptitudeQuestions);

// GET /api/companies/:slug/interview - Get company-wise interview questions
router.get('/:slug/interview', optionalAuthenticate, companySlugParamValidation, validate, companyController.getInterviewQuestions);

// POST /api/companies/:slug/bookmark - Toggle company bookmark
router.post('/:slug/bookmark', authenticateToken, companySlugParamValidation, validate, companyController.toggleBookmark);

// POST /api/companies/:slug/progress/aptitude - Record answer to an aptitude question
router.post('/:slug/progress/aptitude', authenticateToken, recordAptitudeAttemptValidation, validate, companyController.recordAptitudeAttempt);

// POST /api/companies/:slug/progress/interview - Toggle completion for an interview question
router.post('/:slug/progress/interview', authenticateToken, toggleInterviewCompletionValidation, validate, companyController.toggleInterviewCompletion);

// GET /api/companies/:slug/progress - Get user prep progress for specific company
router.get('/:slug/progress', authenticateToken, companySlugParamValidation, validate, companyController.getCompanyProgress);

export default router;
