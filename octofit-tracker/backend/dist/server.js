"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
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
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
const environment = process.env.CODESPACE_NAME ? 'Codespaces' : 'Local';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
            health: '/health',
        },
    });
});
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        environment,
        apiUrl: API_URL,
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected to octofit_db'))
    .catch((err) => console.error('MongoDB connection error:', err));
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: ${API_URL}`);
    console.log(`Environment: ${environment}`);
    console.log('Frontend will run on port 5173');
    console.log('MongoDB running on port 27017');
});
exports.server = server;
exports.default = app;
//# sourceMappingURL=server.js.map