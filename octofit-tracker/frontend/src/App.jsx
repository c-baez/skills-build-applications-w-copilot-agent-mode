import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">A modern multi-tier fitness experience</h1>
              <p className="lead text-muted mb-4">
                Track workouts, manage teams, and compete on a shared leaderboard from one polished app.
              </p>
              <div className="d-flex gap-3">
                <a className="btn btn-primary btn-lg" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
                  Explore the stack
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
                  Learn React 19
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
