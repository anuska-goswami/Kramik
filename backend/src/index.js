import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import subjectRoutes from './routes/subjects.js';
import questionRoutes from './routes/questions.js';
import progressRoutes from './routes/progress.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for local dev; can narrow to localhost:3000 later
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);

// Health Check / Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kramik API is running smoothly.' });
});

// Example Protected Route
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    message: 'Authorized access successful',
    user: req.user
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Kramik Backend running on http://localhost:${PORT}`);
});
