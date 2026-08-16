/**
 * API Configuration with Codespaces Support
 * 
 * Environment Variables:
 * - VITE_CODESPACE_NAME: GitHub Codespace name (auto-set in .env.local)
 * - VITE_API_PORT: Backend API port (default: 8000)
 * 
 * URL Generation:
 * - Codespaces: https://{VITE_CODESPACE_NAME}-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */

const getApiBaseUrl = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiPort = import.meta.env.VITE_API_PORT || '8000';

  // Use Codespaces URL if VITE_CODESPACE_NAME is set and not empty
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-${apiPort}.app.github.dev`;
  }

  // Fallback to localhost for local development
  return `http://localhost:${apiPort}`;
};

/**
 * Build a complete API endpoint URL
 * @param endpoint - API endpoint path (e.g., 'users', 'activities', 'teams')
 * @returns Full API URL for the endpoint
 */
export const getApiUrl = (endpoint?: string): string => {
  const baseUrl = getApiBaseUrl();
  if (endpoint) {
    return `${baseUrl}/api/${endpoint}`;
  }
  return baseUrl;
};

export const getApiBaseUrlForDisplay = (): string => {
  return getApiBaseUrl();
};

export const isCodespacesEnvironment = (): boolean => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return !!codespaceName && codespaceName !== 'undefined';
};
