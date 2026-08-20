import mongoose from 'mongoose';

const qaPairSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewQuestion'
  },
  questionTitle: {
    type: String,
    required: true,
    trim: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['technical', 'hr'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  expectedKeyPoints: [{
    type: String
  }],
  sampleAnswer: {
    type: String
  },
  userAnswer: {
    type: String,
    default: ''
  },
  aiFeedback: {
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    strengths: [{
      type: String
    }],
    improvements: [{
      type: String
    }],
    missingKeyConcepts: [{
      type: String
    }],
    improvedAnswer: {
      type: String,
      default: ''
    }
  },
  submittedAt: {
    type: Date
  }
}, { _id: true });

const weakTopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  averageScore: {
    type: Number,
    required: true
  },
  questionCount: {
    type: Number,
    required: true
  },
  recommendation: {
    type: String
  }
}, { _id: false });

const interviewSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['technical', 'hr', 'mixed'],
    required: true
  },
  targetRole: {
    type: String,
    default: 'Software Engineer',
    trim: true
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress',
    index: true
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  answeredQuestions: {
    type: Number,
    default: 0
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  scoreBreakdown: {
    technicalAccuracy: { type: Number, default: 0 },
    communicationClarity: { type: Number, default: 0 },
    completeness: { type: Number, default: 0 }
  },
  qaPairs: [qaPairSchema],
  aiOverallFeedback: {
    summary: { type: String, default: '' },
    topStrengths: [{ type: String }],
    keyImprovements: [{ type: String }]
  },
  weakTopics: [weakTopicSchema],
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Indexes for user interview history
interviewSessionSchema.index({ user: 1, status: 1, startedAt: -1 });

const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);

export default InterviewSession;
