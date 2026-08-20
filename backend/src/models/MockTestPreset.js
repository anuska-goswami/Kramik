import mongoose from 'mongoose';

const mockTestPresetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Preset title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Preset slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  subjectIds: [{
    type: String,
    trim: true
  }],
  totalQuestions: {
    type: Number,
    required: true,
    default: 20
  },
  timeLimitMinutes: {
    type: Number,
    required: true,
    default: 30
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Mixed'],
    default: 'Mixed'
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MockTestPreset = mongoose.model('MockTestPreset', mockTestPresetSchema);

export default MockTestPreset;
