import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Determine API base URL with Codespaces support
const getApiUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();
const isCodespaces = !!process.env.CODESPACE_NAME;
const environment = isCodespaces ? 'Codespaces' : 'Local';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    environment,
    apiUrl: API_URL,
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    environment,
    apiUrl: API_URL,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected to octofit_db'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🚀 OctoFit Tracker API Server Started`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Environment:        ${environment}`);
  console.log(`Server Port:        ${PORT}`);
  console.log(`API Base URL:       ${API_URL}`);
  console.log(`MongoDB:            mongodb://localhost:27017/octofit_db`);
  console.log(`Frontend Port:      5173`);
  console.log(`${'='.repeat(70)}\n`);
});
