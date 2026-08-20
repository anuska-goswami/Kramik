import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
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
});

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  solvedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  attemptsLog: [attemptSchema],
  totalAttempts: {
    type: Number,
    default: 0
  },
  correctAttempts: {
    type: Number,
    default: 0
  },
  lastStudied: {
    type: Date,
    default: Date.now
  }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
