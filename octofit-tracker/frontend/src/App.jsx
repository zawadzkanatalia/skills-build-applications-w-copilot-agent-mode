import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <section className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Modern fitness tracking for connected teams</h1>
          <p className="lead text-muted">
            Log workouts, follow leaderboards, and keep your community moving with one
            polished experience.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/dashboard">
              Explore dashboard
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="/teams">
              View teams
            </a>
          </div>
        </section>
        <aside className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">App status</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB access via Mongoose</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default App
