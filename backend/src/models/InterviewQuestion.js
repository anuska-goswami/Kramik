import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['technical', 'hr'],
    required: [true, 'Interview question type is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true
  },
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Question category/topic is required'],
    trim: true,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
    index: true
  },
  expectedKeyPoints: [{
    type: String,
    trim: true
  }],
  sampleAnswer: {
    type: String,
    trim: true
  },
  tips: [{
    type: String,
    trim: true
  }],
  targetRole: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text index for search
interviewQuestionSchema.index({
  title: 'text',
  question: 'text',
  category: 'text',
  expectedKeyPoints: 'text'
});

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);

export default InterviewQuestion;
