import mongoose from 'mongoose';

const userPreferencesSchema = new mongoose.Schema({
  emailNotifications: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'dark'
  },
  dailyGoalMinutes: {
    type: Number,
    default: 30
  },
  preferredSubject: {
    type: String,
    default: 'cn'
  }
}, { _id: false });

const profilePictureSchema = new mongoose.Schema({
  url: {
    type: String,
    default: ''
  },
  publicId: {
    type: String,
    default: ''
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: function() { return this.provider === 'local'; },
    minlength: [6, 'Password must be at least 6 characters']
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    default: '',
    index: true
  },
  profilePicture: {
    type: profilePictureSchema,
    default: () => ({ url: '', publicId: '' })
  },
  bio: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  targetRole: {
    type: String,
    trim: true,
    default: 'Software Engineer'
  },
  targetCompany: {
    type: String,
    trim: true,
    default: ''
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  preferences: {
    type: userPreferencesSchema,
    default: () => ({})
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;
