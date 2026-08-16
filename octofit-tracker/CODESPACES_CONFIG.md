# OctoFit Tracker - Node.js API Codespaces & Localhost Configuration ✓

## Configuration Complete

The Node.js Express API backend has been successfully configured to support both GitHub Codespaces and local development environments.

---

## Environment Detection & URL Generation

### Current Implementation
```typescript
const getApiUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    // Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  // Localhost: http://localhost:8000
  return `http://localhost:${PORT}`;
};
```

### Port Configuration
- **Backend Server**: Port 8000 ✓
- **Frontend Server**: Port 5173
- **MongoDB**: Port 27017 (octofit_db)

---

## Detected Environment

### Current Codespace Session
```
Environment:        Codespaces
Codespace Name:     glowing-space-eureka-p7jq47rw447xf6r95
API Base URL:       https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev
Server Port:        8000
```

---

## API Endpoints Verification

### Root Endpoint: `GET /`
```json
{
  "message": "OctoFit Tracker API",
  "version": "1.0.0",
  "environment": "Codespaces",
  "apiUrl": "https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev",
  "endpoints": {
    "users": "/api/users",
    "teams": "/api/teams",
    "activities": "/api/activities",
    "leaderboard": "/api/leaderboard",
    "workouts": "/api/workouts",
    "health": "/health"
  }
}
```

### Health Check: `GET /health`
```json
{
  "status": "OK",
  "environment": "Codespaces",
  "apiUrl": "https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev",
  "timestamp": "2026-08-16T02:22:55.517Z"
}
```

### Users Endpoint: `GET /api/users`
✓ Returns 4 users with seeded data:
- alice (alice@octofit.com)
- bob (bob@octofit.com)
- charlie (charlie@octofit.com)
- diana (diana@octofit.com)

### Activities Endpoint: `GET /api/activities`
✓ Returns 5 activities with seeded data:
- Running (45 min, high intensity)
- Cycling (60 min, high intensity)
- Yoga (60 min, low intensity)
- CrossFit (90 min, high intensity)
- Gym (75 min, high intensity)

---

## Localhost Fallback

When running locally without Codespaces:

```bash
# Local development
$ CODESPACE_NAME="" npm run dev
# API URL: http://localhost:8000
```

Or when `CODESPACE_NAME` environment variable is not set:
```bash
$ npm run dev
# API URL: http://localhost:8000
```

---

## Test Commands

### Start Backend
```bash
cd octofit-tracker/backend
npm run dev              # Development with ts-node
# or
npm run build && npm start  # Production mode
```

### Test Endpoints
```bash
# Root endpoint
curl http://localhost:8000

# Health check
curl http://localhost:8000/health

# List users
curl http://localhost:8000/api/users

# List activities
curl http://localhost:8000/api/activities

# All other endpoints
curl http://localhost:8000/api/teams
curl http://localhost:8000/api/leaderboard
curl http://localhost:8000/api/workouts
```

### Test with Codespaces URL (from frontend)
```bash
# Access from browser:
https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev/api/users
```

---

## Server Startup Output

```
======================================================================
🚀 OctoFit Tracker API Server Started
======================================================================
Environment:        Codespaces
Server Port:        8000
API Base URL:       https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev
MongoDB:            mongodb://localhost:27017/octofit_db
Frontend Port:      5173
======================================================================

MongoDB connected to octofit_db
```

---

## Configuration Files

### Backend Environment Variables
No `.env` file required for basic setup. Optional settings:
```bash
PORT=8000                                    # Default
MONGODB_URI=mongodb://localhost:27017/octofit_db  # Default
NODE_ENV=development                        # Default
```

### Automatic Detection
- **CODESPACE_NAME**: Auto-detected from GitHub Codespaces environment
- **PORT**: Uses env variable or defaults to 8000
- **MONGODB_URI**: Uses env variable or defaults to local MongoDB

---

## Frontend Configuration

The frontend can access the API through:

### Development Mode (Vite Proxy)
```javascript
// vite.config.js configured with proxy
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
}
```

### Frontend Environment (.env.local)
```
VITE_API_URL=http://localhost:8000
```

### Runtime URL Detection (App.jsx)
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

---

## Build & Deployment

### Production Build
```bash
cd octofit-tracker/backend
npm run build
npm start
```

### Verification Checklist
- [x] Backend runs on port 8000
- [x] Codespaces URL format: `https://{CODESPACE_NAME}-8000.app.github.dev`
- [x] Localhost fallback: `http://localhost:8000`
- [x] Environment detection works (Codespaces vs Local)
- [x] `/api/users` endpoint returns seeded data
- [x] `/api/activities` endpoint returns seeded data
- [x] MongoDB connection verified
- [x] CORS enabled for cross-origin requests
- [x] Health check endpoint operational

---

## Codespaces Access

When running in GitHub Codespaces:

1. **Public Ports Forward**: Automatically configured
   - Port 8000 → `{CODESPACE_NAME}-8000.app.github.dev`
   - Port 5173 → `{CODESPACE_NAME}-5173.app.github.dev`

2. **Frontend Access**:
   ```
   https://glowing-space-eureka-p7jq47rw447xf6r95-5173.app.github.dev
   ```

3. **Backend API Access**:
   ```
   https://glowing-space-eureka-p7jq47rw447xf6r95-8000.app.github.dev
   ```

4. **Frontend to Backend Communication**:
   - Uses Vite proxy in dev mode
   - Direct HTTPS calls in production

---

**Configuration Verified**: 2026-08-16  
**Status**: ✓ Ready for Development & Deployment
