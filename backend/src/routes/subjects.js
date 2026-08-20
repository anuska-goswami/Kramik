import express from 'express';
import * as subjectController from '../controllers/subject.controller.js';
import { optionalAuthenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuthenticate, subjectController.getAllSubjects);
router.get('/:id', optionalAuthenticate, subjectController.getSubjectById);

export default router;
