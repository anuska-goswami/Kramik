import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  // Array of ObjectIds pointing to solved questions
  solvedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  lastStudied: {
    type: Date,
    default: Date.now
  }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
