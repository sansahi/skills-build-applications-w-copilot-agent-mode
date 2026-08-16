"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Determine API base URL with Codespaces support
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.preview.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        apiUrl: API_URL,
        version: '1.0.0'
    });
});
app.get('/health', (req, res) => {
    res.json({ status: 'OK', apiUrl: API_URL });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected to octofit_db'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: ${API_URL}`);
    console.log(`Frontend will run on port 5173`);
    console.log(`MongoDB running on port 27017`);
});
//# sourceMappingURL=index.js.map