import { useEffect, useState } from 'react'
import { getApiUrl, getApiBaseUrlForDisplay, isCodespacesEnvironment } from '../config/api'

export default function Home() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const apiBaseUrl = getApiBaseUrlForDisplay()
  const isCodespaces = isCodespacesEnvironment()

  useEffect(() => {
    fetch(`${getApiUrl()}/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching API status:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-4 mb-4">🐙 Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">
            Build your fitness goals and compete with your team. Track activities, manage
            workouts, and climb the leaderboard!
          </p>

          <div className="row mb-5">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">Manage user profiles and fitness goals</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏢 Teams</h5>
                  <p className="card-text">Create teams and invite members</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📊 Activities</h5>
                  <p className="card-text">Log and track all your fitness activities</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">Compete and see your ranking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-info mb-4">
            <strong>Backend Status:</strong>{' '}
            {loading ? (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            ) : status ? (
              <span className="badge bg-success ms-2">Connected</span>
            ) : (
              <span className="badge bg-danger ms-2">Disconnected</span>
            )}
          </div>

          <div className="card bg-light mb-4">
            <div className="card-body">
              <h5 className="card-title">API Configuration</h5>
              <dl className="mb-0">
                <dt>Environment</dt>
                <dd>{isCodespaces ? '🌐 GitHub Codespaces' : '💻 Local Development'}</dd>
                <dt>API Base URL</dt>
                <dd>
                  <code>{apiBaseUrl}</code>
                </dd>
                <dt>Configuration</dt>
                <dd>
                  <small className="text-muted">
                    Set VITE_CODESPACE_NAME in .env.local for Codespaces support
                  </small>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
