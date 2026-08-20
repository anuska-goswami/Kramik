import { asyncHandler } from '../utils/asyncHandler.js';
import * as subjectService from '../services/subject.service.js';

export const getAllSubjects = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const subjects = await subjectService.getAllSubjectsWithStats(userId);
  res.status(200).json(subjects);
});

export const getSubjectById = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const subject = await subjectService.getSubjectByIdWithStats(req.params.id, userId);
  res.status(200).json(subject);
});
