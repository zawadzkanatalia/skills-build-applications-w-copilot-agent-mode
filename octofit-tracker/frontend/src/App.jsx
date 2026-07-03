import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiHint = codespaceName
    ? `Using Codespaces API host https://${codespaceName}-8000.app.github.dev`
    : 'Set VITE_CODESPACE_NAME in .env.local to enable the Codespaces API host.';

  return (
    <main className="container py-5">
      <div className="row align-items-start g-4">
        <section className="col-lg-8">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Modern fitness tracking for connected teams</h1>
          <p className="lead text-muted">
            Log workouts, follow leaderboards, and keep your community moving with one polished
            experience.
          </p>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <NavLink className="btn btn-primary" to="/">
              Dashboard
            </NavLink>
            <NavLink className="btn btn-outline-secondary" to="/activities">
              Activities
            </NavLink>
            <NavLink className="btn btn-outline-secondary" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="btn btn-outline-secondary" to="/teams">
              Teams
            </NavLink>
            <NavLink className="btn btn-outline-secondary" to="/users">
              Users
            </NavLink>
            <NavLink className="btn btn-outline-secondary" to="/workouts">
              Workouts
            </NavLink>
          </div>

          <div className="alert alert-info" role="status">
            {apiHint}
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="row g-3">
                  <div className="col-lg-6">
                    <Activities />
                  </div>
                  <div className="col-lg-6">
                    <Leaderboard />
                  </div>
                  <div className="col-lg-6">
                    <Teams />
                  </div>
                  <div className="col-lg-6">
                    <Workouts />
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>

        <aside className="col-lg-4">
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
  );
}

export default App;
