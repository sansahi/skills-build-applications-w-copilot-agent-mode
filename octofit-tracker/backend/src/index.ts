import express, { Express } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend will run on port 5173`);
  console.log(`MongoDB running on port 27017`);
});
