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
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
const isCodespaces = !!process.env.CODESPACE_NAME;
const environment = isCodespaces ? 'Codespaces' : 'Local';
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
//# sourceMappingURL=index.js.map