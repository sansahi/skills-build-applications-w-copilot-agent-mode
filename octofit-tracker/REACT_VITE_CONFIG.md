# React 19 + Vite: Codespaces & Localhost Configuration

## Overview

The OctoFit Tracker React 19 frontend is configured to automatically detect and use the appropriate API base URL depending on whether it's running in GitHub Codespaces or local development.

## Configuration Files

### `.env.local` (Local Development)
```
# GitHub Codespaces environment (auto-detected from CODESPACE_NAME)
VITE_CODESPACE_NAME=

# API Configuration
VITE_API_PORT=8000

# Fallback: If VITE_CODESPACE_NAME is empty, API defaults to http://localhost:8000
```

### `.env.example` (Template)
```
# GitHub Codespaces name - leave empty for local development
# In Codespaces, set this to your Codespace name (e.g., glowing-space-eureka-abc123)
VITE_CODESPACE_NAME=

# Backend API port (default 8000)
VITE_API_PORT=8000

# URL Generation:
#   - Codespaces: https://{VITE_CODESPACE_NAME}-8000.app.github.dev
#   - Local Dev: http://localhost:8000
```

## API Configuration Module

**File**: `src/config/api.ts`

### Functions

#### `getApiBaseUrl(): string`
Returns the appropriate API base URL based on environment:
- **Codespaces**: `https://{VITE_CODESPACE_NAME}-{VITE_API_PORT}.app.github.dev`
- **Local Dev**: `http://localhost:{VITE_API_PORT}`

#### `getApiUrl(endpoint?: string): string`
Builds a complete API endpoint URL:
```typescript
// Example usage:
getApiUrl('users')      // → https://[codespace]-8000.app.github.dev/api/users
getApiUrl('activities') // → https://[codespace]-8000.app.github.dev/api/activities
getApiUrl()             // → https://[codespace]-8000.app.github.dev (base URL)
```

#### `getApiBaseUrlForDisplay(): string`
Returns the base API URL for display in UI (same as `getApiBaseUrl()`)

#### `isCodespacesEnvironment(): boolean`
Returns `true` if running in Codespaces, `false` for local development

## Safe Fallback Logic

The API configuration includes safety checks to prevent invalid URLs:

```typescript
// Safe handling of undefined/empty VITE_CODESPACE_NAME
if (codespaceName && codespaceName !== 'undefined') {
  return `https://${codespaceName}-${apiPort}.app.github.dev`;
}
// Fallback to localhost
return `http://localhost:${apiPort}`;
```

This ensures that if `VITE_CODESPACE_NAME` is empty or undefined, the frontend won't generate invalid URLs like `https://undefined-8000.app.github.dev`.

## Component Updates

All page components have been updated to use the centralized API configuration:

### Before (apiUrl passed as prop)
```jsx
function Users({ apiUrl }) {
  fetch(`${apiUrl}/api/users`)
}

// In App.jsx
<Route path="/users" element={<Users apiUrl={apiUrl} />} />
```

### After (using API config utility)
```jsx
import { getApiUrl } from '../config/api'

function Users() {
  fetch(getApiUrl('users'))
}

// In App.jsx - no need to pass apiUrl prop
<Route path="/users" element={<Users />} />
```

## Updated Components

1. **App.jsx**
   - Removed apiUrl prop passing
   - Uses `getApiBaseUrlForDisplay()` for footer display
   - Uses `isCodespacesEnvironment()` for environment badge

2. **Home.jsx**
   - Uses `getApiUrl()` for health check
   - Displays environment and API base URL
   - Shows configuration documentation

3. **Users.jsx**
   - Uses `getApiUrl('users')` for API call
   - Handles array response: `data.users || []`

4. **Teams.jsx**
   - Uses `getApiUrl('teams')`
   - Handles array response: `data.teams || []`

5. **Activities.jsx**
   - Uses `getApiUrl('activities')`
   - Handles array response: `data.activities || []`

6. **Leaderboard.jsx**
   - Uses `getApiUrl('leaderboard')`
   - Handles array response: `data.leaderboard || []`

7. **Workouts.jsx**
   - Uses `getApiUrl('workouts')`
   - Handles array response: `data.workouts || []`

## Environment Detection

### In Codespaces
When running in GitHub Codespaces, the `CODESPACE_NAME` environment variable is automatically set. The React frontend should copy this value to `VITE_CODESPACE_NAME` in `.env.local`:

```bash
# In Codespaces, .env.local should contain:
VITE_CODESPACE_NAME=glowing-space-eureka-abc123
VITE_API_PORT=8000
```

**Result**: API URL becomes `https://glowing-space-eureka-abc123-8000.app.github.dev`

### In Local Development
Leave `VITE_CODESPACE_NAME` empty in `.env.local`:

```bash
# In local dev, .env.local should contain:
VITE_CODESPACE_NAME=
VITE_API_PORT=8000
```

**Result**: API URL becomes `http://localhost:8000`

## Running the Frontend

### Development Mode
```bash
cd octofit-tracker/frontend
npm run dev
# Vite starts on http://localhost:5173
```

### Production Build
```bash
npm run build
# Output: dist/ folder with optimized assets
```

### Serve Production Build Locally
```bash
npm run preview
# Serves the production build on http://localhost:5173
```

## Testing API Integration

### Health Check
```bash
# Verify backend is reachable
curl $(node -e "console.log(require('./src/config/api').getApiUrl())")/health
```

### Fetch Users
```bash
curl $(node -e "console.log(require('./src/config/api').getApiUrl('users'))")
```

## Data Format Compatibility

All page components are compatible with both:

1. **Array responses**: `data.users || []`
2. **Paginated responses**: `data.data[0] || []` (easily modified if needed)

Current API returns simple arrays:
```json
{
  "message": "OctoFit Tracker API",
  "users": [...],
  "activities": [...],
  "teams": [...],
  "leaderboard": [...],
  "workouts": [...]
}
```

## Troubleshooting

### Issue: API returns `https://undefined-8000.app.github.dev`
**Solution**: Ensure `VITE_CODESPACE_NAME` in `.env.local` is properly set or left empty

### Issue: Cannot reach `http://localhost:8000`
**Solution**: Verify backend server is running and listening on port 8000

### Issue: Frontend shows wrong environment in footer
**Solution**: Check that `.env.local` has correct `VITE_CODESPACE_NAME` value

### Issue: API calls fail with CORS error
**Solution**: Verify backend has CORS enabled (Express: `app.use(cors())`)

## Files Modified

- ✅ `src/config/api.ts` - New API configuration utility
- ✅ `src/App.jsx` - Updated to use API config
- ✅ `src/pages/Home.jsx` - Updated with API config
- ✅ `src/pages/Users.jsx` - Updated with API config
- ✅ `src/pages/Teams.jsx` - Updated with API config
- ✅ `src/pages/Activities.jsx` - Updated with API config
- ✅ `src/pages/Leaderboard.jsx` - Updated with API config
- ✅ `src/pages/Workouts.jsx` - Updated with API config
- ✅ `.env.local` - Updated with Codespaces variables
- ✅ `.env.example` - Updated with documentation

---

**Configuration Status**: ✅ Ready for Codespaces & Local Development
