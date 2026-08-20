import mongoose from 'mongoose';

const dailyTaskSchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  subjectId: {
    type: String,
    default: null
  },
  topicId: {
    type: String,
    default: null
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
});

const roadmapGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  targetDays: {
    type: Number,
    required: [true, 'Target duration in days is required'],
    min: [1, 'Target duration must be at least 1 day']
  },
  subjectId: {
    type: String,
    default: null
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  targetDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'In Progress'
  },
  dailyTasks: [dailyTaskSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RoadmapGoal = mongoose.model('RoadmapGoal', roadmapGoalSchema);

export default RoadmapGoal;
