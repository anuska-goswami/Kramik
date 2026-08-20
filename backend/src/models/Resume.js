import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, default: '', trim: true },
  location: { type: String, default: '', trim: true },
  website: { type: String, default: '', trim: true },
  linkedin: { type: String, default: '', trim: true },
  github: { type: String, default: '', trim: true }
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  location: { type: String, default: '', trim: true },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  isCurrent: { type: Boolean, default: false },
  highlights: [{ type: String, trim: true }]
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  fieldOfStudy: { type: String, default: '', trim: true },
  location: { type: String, default: '', trim: true },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  score: { type: String, default: '', trim: true }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  technologies: [{ type: String, trim: true }],
  link: { type: String, default: '', trim: true },
  highlights: [{ type: String, trim: true }]
});

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, default: 'General', trim: true },
  items: [{ type: String, trim: true }]
});

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, default: '', trim: true },
  date: { type: String, default: '' }
});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    default: 'My Resume',
    trim: true
  },
  templateId: {
    type: String,
    enum: ['modern', 'classic', 'minimal', 'executive', 'tech'],
    default: 'modern'
  },
  personalInfo: {
    type: personalInfoSchema,
    required: true
  },
  summary: {
    type: String,
    default: '',
    trim: true
  },
  experience: [experienceSchema],
  education: [educationSchema],
  projects: [projectSchema],
  skills: [skillCategorySchema],
  certifications: [certificationSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
