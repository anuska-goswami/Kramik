import mongoose from 'mongoose';

const aptitudeAttemptSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyQuestion',
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: true
  },
  attemptedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const interviewCompletionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyQuestion',
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const userCompanyProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  companySlug: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  isBookmarked: {
    type: Boolean,
    default: false,
    index: true
  },
  solvedAptitudeQuestions: [aptitudeAttemptSchema],
  completedInterviewQuestions: [interviewCompletionSchema],
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a single user progress document per user per company
userCompanyProgressSchema.index({ user: 1, companySlug: 1 }, { unique: true });
userCompanyProgressSchema.index({ user: 1, isBookmarked: 1 });

const UserCompanyProgress = mongoose.model('UserCompanyProgress', userCompanyProgressSchema);

export default UserCompanyProgress;
