import mongoose from 'mongoose';

const testQuestionSnapshotSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  subjectId: {
    type: String,
    required: true
  },
  topicId: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  selectedOption: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['correct', 'incorrect', 'unanswered'],
    default: 'unanswered'
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  timeTakenSeconds: {
    type: Number,
    default: 0
  }
}, { _id: true });

const subjectBreakdownSchema = new mongoose.Schema({
  subjectId: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  correctCount: {
    type: Number,
    default: 0
  },
  incorrectCount: {
    type: Number,
    default: 0
  },
  unansweredCount: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    default: 0
  }
}, { _id: false });

const mockTestAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subjectIds: [{
    type: String,
    trim: true
  }],
  totalQuestions: {
    type: Number,
    required: true
  },
  timeLimitMinutes: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'in-progress', 'completed', 'expired'],
    default: 'in-progress',
    index: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  submittedAt: {
    type: Date
  },
  timeTakenSeconds: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    default: 0
  },
  correctAnswersCount: {
    type: Number,
    default: 0
  },
  incorrectAnswersCount: {
    type: Number,
    default: 0
  },
  unansweredCount: {
    type: Number,
    default: 0
  },
  questions: [testQuestionSnapshotSchema],
  subjectBreakdown: [subjectBreakdownSchema]
});

// Indexes for fast user test history, analytics & leaderboard calculation
mockTestAttemptSchema.index({ user: 1, status: 1, startedAt: -1 });
mockTestAttemptSchema.index({ user: 1, status: 1, submittedAt: -1 });
mockTestAttemptSchema.index({ status: 1, submittedAt: -1 });
mockTestAttemptSchema.index({ status: 1, score: -1, accuracy: -1, timeTakenSeconds: 1 });
mockTestAttemptSchema.index({ user: 1, 'subjectBreakdown.subjectId': 1 });

const MockTestAttempt = mongoose.model('MockTestAttempt', mockTestAttemptSchema);

export default MockTestAttempt;
