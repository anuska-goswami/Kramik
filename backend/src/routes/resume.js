import express from 'express';
import * as resumeController from '../controllers/resume.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { saveResumeValidation, aiGenerateValidation } from '../validators/resume.validator.js';

const router = express.Router();

// GET /api/resume/templates - Fetch supported resume templates
router.get('/templates', authenticateToken, resumeController.getTemplates);

// POST /api/resume/ai-generate - Generate AI summary or action bullet points using Gemini
router.post('/ai-generate', authenticateToken, aiGenerateValidation, validate, resumeController.generateAiContent);

// POST /api/resume/ai-review - Perform AI ATS Resume Review (score, feedback, missing keywords)
router.post('/ai-review', authenticateToken, resumeController.reviewAiResume);

// GET /api/resume - Fetch all saved resumes for authenticated user
router.get('/', authenticateToken, resumeController.getUserResumes);

// POST /api/resume - Save a new resume document
router.post('/', authenticateToken, saveResumeValidation, validate, resumeController.createResume);

// GET /api/resume/:id - Fetch single resume by ID
router.get('/:id', authenticateToken, resumeController.getResumeById);

// PUT /api/resume/:id - Update saved resume
router.put('/:id', authenticateToken, saveResumeValidation, validate, resumeController.updateResume);

// DELETE /api/resume/:id - Delete a saved resume
router.delete('/:id', authenticateToken, resumeController.deleteResume);

// GET /api/resume/:id/pdf - Export resume as downloadable PDF document
router.get('/:id/pdf', authenticateToken, resumeController.exportPdf);

export default router;
