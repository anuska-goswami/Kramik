import Resume from '../models/Resume.js';
import { ApiError } from '../utils/apiResponse.js';

export const createResume = async (userId, resumeData) => {
  const newResume = new Resume({
    ...resumeData,
    user: userId
  });
  await newResume.save();
  return newResume;
};

export const getUserResumes = async (userId) => {
  const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 }).lean();
  return resumes;
};

export const getResumeById = async (userId, resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  return resume;
};

export const updateResume = async (userId, resumeId, updateData) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  Object.assign(resume, updateData);
  await resume.save();
  return resume;
};

export const deleteResume = async (userId, resumeId) => {
  const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  return { message: 'Resume deleted successfully' };
};

export const getSupportedTemplates = () => {
  return [
    {
      id: 'modern',
      name: 'Modern Clean',
      description: 'Clean two-tone layout with Royal Blue accents, ideal for software engineers and product teams.',
      previewColor: '#2563eb'
    },
    {
      id: 'classic',
      name: 'Classic Serif',
      description: 'Traditional slate layout ideal for corporate, finance, and academic roles.',
      previewColor: '#0f172a'
    },
    {
      id: 'minimal',
      name: 'Minimalist Tech',
      description: 'Ultra-clean single column layout focusing on technical projects and skills.',
      previewColor: '#334155'
    },
    {
      id: 'executive',
      name: 'Executive Dark Teal',
      description: 'Sophisticated dark teal headers for senior engineers and team leads.',
      previewColor: '#0f766e'
    },
    {
      id: 'tech',
      name: 'Developer Indigo',
      description: 'Modern indigo styling optimized for full-stack developers and open-source contributors.',
      previewColor: '#4f46e5'
    }
  ];
};
