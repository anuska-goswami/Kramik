import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }], // e.g. ["Option A", "Option B", "Option C", "Option D"]
  correctAnswer: {
    type: String,
    required: true
  }, // e.g. "0" or the correct option text
  explanation: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  // References a Subject document's string id (e.g. "cn", "os", "dbms", "aptitude")
  subjectId: {
    type: String,
    required: true,
    index: true
  },
  // References a Topic's id within that subject (e.g. "t1", "os-t1", etc.)
  topicId: {
    type: String,
    required: true,
    index: true
  },
  // References to companies that have asked this question (for future use)
  companies: [{
    type: String,
    index: true
  }], // e.g. ["google", "microsoft"]
  tags: [{
    type: String,
    index: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Full-text search index for titles and descriptions
questionSchema.index({ title: 'text', description: 'text' });

const Question = mongoose.model('Question', questionSchema);

export default Question;
