import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { getApiBaseUrlForDisplay, isCodespacesEnvironment } from './config/api'
import Home from './pages/Home'
import Users from './pages/Users'
import Teams from './pages/Teams'
import Activities from './pages/Activities'
import Leaderboard from './pages/Leaderboard'
import Workouts from './pages/Workouts'

function App() {
  const apiBaseUrl = getApiBaseUrlForDisplay()
  const isCodespaces = isCodespacesEnvironment()

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <div className="container-fluid">
            <p className="mb-2">OctoFit Tracker © 2026</p>
            <small className="text-muted">
              Environment: {isCodespaces ? '🌐 Codespaces' : '💻 Local'} | API: {apiBaseUrl}
            </small>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
