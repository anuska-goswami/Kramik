import { asyncHandler } from '../utils/asyncHandler.js';
import * as resumeService from '../services/resume.service.js';
import * as aiService from '../services/ai.service.js';
import * as pdfService from '../services/pdf.service.js';

export const createResume = asyncHandler(async (req, res) => {
  const result = await resumeService.createResume(req.user.id, req.body);
  res.status(201).json(result);
});

export const getUserResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getUserResumes(req.user.id);
  res.status(200).json(resumes);
});

export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.user.id, req.params.id);
  res.status(200).json(resume);
});

export const updateResume = asyncHandler(async (req, res) => {
  const result = await resumeService.updateResume(req.user.id, req.params.id, req.body);
  res.status(200).json(result);
});

export const deleteResume = asyncHandler(async (req, res) => {
  const result = await resumeService.deleteResume(req.user.id, req.params.id);
  res.status(200).json(result);
});

export const getTemplates = asyncHandler(async (req, res) => {
  const templates = resumeService.getSupportedTemplates();
  res.status(200).json(templates);
});

export const generateAiContent = asyncHandler(async (req, res) => {
  const { type, targetRole, skills, experienceYears, keyHighlights, position, company, keyTasks } = req.body;

  if (type === 'summary') {
    const summaries = await aiService.generateAiSummary({ targetRole, skills, experienceYears, keyHighlights });
    return res.status(200).json({ type: 'summary', summaries });
  }

  if (type === 'bullets') {
    const bulletPoints = await aiService.generateAiBulletPoints({ position, company, keyTasks, targetRole });
    return res.status(200).json({ type: 'bullets', bulletPoints });
  }
});

export const reviewAiResume = asyncHandler(async (req, res) => {
  const resumeContent = req.body.resumeData || req.body;
  const reviewResult = await aiService.reviewAiResume(resumeContent);
  res.status(200).json(reviewResult);
});

export const exportPdf = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.user.id, req.params.id);
  const pdfBuffer = await pdfService.generateResumePDFBuffer(resume);

  const safeFilename = (resume.title || 'Resume').replace(/[^a-zA-Z0-9_\-]/g, '_');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.pdf"`);
  res.setHeader('Content-Length', pdfBuffer.length);
  res.send(pdfBuffer);
});
