import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-6 fw-bold mb-3">A modern multi-tier fitness experience</h1>
              <p className="lead text-muted mb-4">
                Track workouts, manage teams, and compete on a shared leaderboard from one polished app.
              </p>
              <p className="small text-muted mb-4">
                Set VITE_CODESPACE_NAME in .env.local to use the Codespaces API URL automatically. If it is not set, the app falls back to localhost.
              </p>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={item.to}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route path="/" element={<div className="alert alert-info">Select a section to view OctoFit data from the API.</div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
