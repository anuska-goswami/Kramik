import mongoose from 'mongoose';

const companyQuestionSchema = new mongoose.Schema({
  companySlug: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  type: {
    type: String,
    enum: ['aptitude', 'interview'],
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  round: {
    type: String,
    trim: true,
    default: 'General'
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
    index: true
  },
  // Aptitude specific fields
  options: [{
    type: String,
    trim: true
  }],
  correctAnswer: {
    type: String,
    trim: true
  },
  explanation: {
    type: String,
    trim: true
  },
  // Interview specific fields
  sampleAnswer: {
    type: String,
    trim: true
  },
  keyConcepts: [{
    type: String,
    trim: true
  }],
  frequency: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  tags: [{
    type: String,
    trim: true,
    index: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound indexes for fast querying by company and type/category
companyQuestionSchema.index({ companySlug: 1, type: 1, difficulty: 1 });
companyQuestionSchema.index({ companySlug: 1, type: 1, category: 1 });

// Full text search index
companyQuestionSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  tags: 'text'
});

const CompanyQuestion = mongoose.model('CompanyQuestion', companyQuestionSchema);

export default CompanyQuestion;
