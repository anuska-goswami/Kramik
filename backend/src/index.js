import dotenv from 'dotenv';

dotenv.config();

// Enforce mandatory environment variables check before starting
if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL ERROR: JWT_SECRET environment variable is missing.');
  process.exit(1);
}

import app from './app.js';
import { connectDB } from './db.js';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Kramik Backend running on http://localhost:${PORT}`);
});
