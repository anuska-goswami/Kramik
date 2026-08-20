import mongoose from 'mongoose';

const selectionRoundSchema = new mongoose.Schema({
  roundNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  }
}, { _id: false });

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Company slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  tier: {
    type: String,
    required: true,
    enum: ['MAANG', 'Product-Based', 'Service-Based', 'Startup'],
    default: 'Product-Based',
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
    index: true
  },
  avgCTC: {
    type: String,
    trim: true
  },
  locations: [{
    type: String,
    trim: true
  }],
  roles: [{
    type: String,
    trim: true
  }],
  website: {
    type: String,
    trim: true
  },
  overview: {
    type: String,
    trim: true
  },
  selectionProcess: [selectionRoundSchema],
  prepTips: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    index: true
  }],
  isPopular: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Full-text search index for name, description, industry, overview, and tags
companySchema.index({
  name: 'text',
  description: 'text',
  industry: 'text',
  overview: 'text',
  roles: 'text',
  tags: 'text'
});

const Company = mongoose.model('Company', companySchema);

export default Company;
