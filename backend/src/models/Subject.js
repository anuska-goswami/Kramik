import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  }
});

const chapterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  topics: [topicSchema]
});

const subjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  }, // e.g. "cn", "os", "dbms", "aptitude"
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  chapters: [chapterSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
