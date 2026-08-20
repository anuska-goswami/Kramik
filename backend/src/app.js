import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import subjectRoutes from './routes/subjects.js';
import questionRoutes from './routes/questions.js';
import progressRoutes from './routes/progress.js';
import userRoutes from './routes/user.js';
import dashboardRoutes from './routes/dashboard.js';
import roadmapRoutes from './routes/roadmap.js';
import resumeRoutes from './routes/resume.js';
import { getHealth } from './controllers/health.controller.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Enable Helmet for secure HTTP headers
app.use(helmet());

// Configure CORS using CLIENT_URL from .env
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === clientUrl || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/resume', resumeRoutes);
app.get('/api/health', getHealth);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
